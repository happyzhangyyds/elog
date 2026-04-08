const NOTION_VERSION = '2022-06-28'

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405)
    }

    const rawBody = await request.text()
    let payload

    try {
      payload = JSON.parse(rawBody)
    } catch {
      return json({ ok: false, error: 'Invalid JSON payload' }, 400)
    }

    if (payload?.verification_token) {
      console.log(
        JSON.stringify({
          message:
            'Received Notion webhook verification token. Copy it from the Vercel logs and paste it into the Notion integration UI.',
          verification_token: payload.verification_token,
        }),
      )
      return json({ ok: true, mode: 'verification' })
    }

    if (!process.env.NOTION_VERIFICATION_TOKEN) {
      return json(
        {
          ok: false,
          error:
            'Missing NOTION_VERIFICATION_TOKEN. Complete Notion webhook verification first, then set it in Vercel environment variables.',
        },
        500,
      )
    }

    const signature = request.headers.get('X-Notion-Signature')
    const isTrusted = await verifySignature(
      rawBody,
      signature,
      process.env.NOTION_VERIFICATION_TOKEN,
    )

    if (!isTrusted) {
      return json({ ok: false, error: 'Invalid Notion signature' }, 401)
    }

    if (payload?.type !== 'page.properties_updated') {
      return json({
        ok: true,
        ignored: true,
        reason: `Unsupported event type: ${payload?.type ?? 'unknown'}`,
      })
    }

    const pageId = payload?.entity?.id
    if (!pageId) {
      return json({ ok: false, error: 'Missing page id in webhook payload' }, 400)
    }

    const page = await fetchNotionPage(pageId)
    if (!page.ok) {
      return json(
        {
          ok: false,
          error: 'Failed to fetch page from Notion',
          detail: page.error,
        },
        page.status,
      )
    }

    const filters = getFilterConfig()
    const metadata = extractPageMetadata(page.data, filters)

    if (
      filters.allowedDatabaseIds.length > 0 &&
      !filters.allowedDatabaseIds.includes(metadata.databaseId)
    ) {
      return json({
        ok: true,
        ignored: true,
        reason: `Database ${metadata.databaseId} is not allowed`,
        page_id: pageId,
      })
    }

    if (metadata.typeValue !== filters.requiredType) {
      return json({
        ok: true,
        ignored: true,
        reason: `${filters.typeProperty} is ${metadata.typeValue ?? 'undefined'}`,
        page_id: pageId,
      })
    }

    if (metadata.statusValue !== filters.requiredStatus) {
      return json({
        ok: true,
        ignored: true,
        reason: `${filters.statusProperty} is ${metadata.statusValue ?? 'undefined'}`,
        page_id: pageId,
      })
    }

    const dispatch = await triggerGitHubDispatch({
      pageId,
      databaseId: metadata.databaseId,
      title: metadata.title,
      status: metadata.statusValue,
      type: metadata.typeValue,
      notionEventId: payload.id,
      notionEventType: payload.type,
      updatedProperties: payload?.data?.updated_properties ?? [],
    })

    if (!dispatch.ok) {
      return json(
        {
          ok: false,
          error: 'Failed to trigger GitHub repository_dispatch',
          detail: dispatch.error,
          page_id: pageId,
        },
        dispatch.status,
      )
    }

    return json({
      ok: true,
      dispatched: true,
      page_id: pageId,
      database_id: metadata.databaseId,
      title: metadata.title,
    })
  },
}

function getFilterConfig() {
  return {
    typeProperty: process.env.NOTION_TYPE_PROPERTY || 'type',
    requiredType: process.env.NOTION_REQUIRED_TYPE || 'Post',
    statusProperty: process.env.NOTION_STATUS_PROPERTY || 'status',
    requiredStatus: process.env.NOTION_REQUIRED_STATUS || 'published',
    titleProperty: process.env.NOTION_TITLE_PROPERTY || 'title',
    allowedDatabaseIds: (process.env.NOTION_ALLOWED_DATABASE_IDS || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
  }
}

async function fetchNotionPage(pageId) {
  if (!process.env.NOTION_INTERNAL_TOKEN) {
    return {
      ok: false,
      status: 500,
      error: 'Missing NOTION_INTERNAL_TOKEN',
    }
  }

  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_INTERNAL_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
    },
  })

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: await response.text(),
    }
  }

  return {
    ok: true,
    data: await response.json(),
  }
}

async function triggerGitHubDispatch(payload) {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const token = process.env.GITHUB_TOKEN
  const eventType = process.env.GITHUB_EVENT_TYPE || 'notion_publish'

  if (!owner || !repo || !token) {
    return {
      ok: false,
      status: 500,
      error: 'Missing GitHub dispatch environment variables',
    }
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/dispatches`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'notion-webhook-vercel',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        client_payload: payload,
      }),
    },
  )

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: await response.text(),
    }
  }

  return { ok: true }
}

function extractPageMetadata(page, filters) {
  const properties = page?.properties || {}
  const title =
    readTitle(properties[filters.titleProperty]) ||
    readTitle(findFirstTitleProperty(properties)) ||
    page?.id
  const typeValue = readSelectValue(properties[filters.typeProperty])
  const statusValue = readStatusValue(properties[filters.statusProperty])
  const databaseId =
    page?.parent?.type === 'database_id' ? page.parent.database_id : null

  return {
    title,
    typeValue,
    statusValue,
    databaseId,
  }
}

function readTitle(property) {
  if (!property) return null
  if (property.type === 'title') {
    return joinRichText(property.title)
  }
  if (property.type === 'rich_text') {
    return joinRichText(property.rich_text)
  }
  return null
}

function findFirstTitleProperty(properties) {
  return Object.values(properties).find((property) => property?.type === 'title')
}

function joinRichText(items = []) {
  return items.map((item) => item.plain_text || '').join('').trim() || null
}

function readSelectValue(property) {
  if (!property) return null
  if (property.type === 'select') {
    return property.select?.name ?? null
  }
  if (property.type === 'status') {
    return property.status?.name ?? null
  }
  return null
}

function readStatusValue(property) {
  if (!property) return null
  if (property.type === 'status') {
    return property.status?.name ?? null
  }
  if (property.type === 'select') {
    return property.select?.name ?? null
  }
  return null
}

async function verifySignature(rawBody, signatureHeader, verificationToken) {
  if (!signatureHeader?.startsWith('sha256=')) {
    return false
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(verificationToken),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(rawBody),
  )

  const expected = `sha256=${toHex(signature)}`
  return timingSafeEqual(expected, signatureHeader)
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let result = 0
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }
  return result === 0
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
