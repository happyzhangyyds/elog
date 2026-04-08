import webhook from '../api/notion-webhook.mjs'

const verificationToken =
  process.env.NOTION_VERIFICATION_TOKEN || 'local_verification_token'
const pageId = '153104cd-477e-809d-8dc4-ff2d96ae3090'
const databaseId = '2376ddcd5429803d9420ea5d825e6205'

process.env.NOTION_INTERNAL_TOKEN ||= 'local_notion_token'
process.env.NOTION_VERIFICATION_TOKEN ||= verificationToken
process.env.GITHUB_OWNER ||= 'happyzhangyyds'
process.env.GITHUB_REPO ||= 'elog'
process.env.GITHUB_TOKEN ||= 'local_github_token'
process.env.GITHUB_EVENT_TYPE ||= 'notion_publish'
process.env.NOTION_ALLOWED_DATABASE_IDS ||= databaseId
process.env.NOTION_TYPE_PROPERTY ||= 'type'
process.env.NOTION_REQUIRED_TYPE ||= 'Post'
process.env.NOTION_STATUS_PROPERTY ||= 'status'
process.env.NOTION_REQUIRED_STATUS ||= 'published'
process.env.NOTION_TITLE_PROPERTY ||= 'title'

const originalFetch = globalThis.fetch
globalThis.fetch = async (url, options = {}) => {
  if (typeof url === 'string' && url.startsWith('https://api.notion.com/v1/pages/')) {
    return jsonResponse({
      id: pageId,
      parent: {
        type: 'database_id',
        database_id: databaseId,
      },
      properties: {
        title: {
          id: 'title',
          type: 'title',
          title: [
            {
              plain_text: 'Local Webhook Smoke Test',
            },
          ],
        },
        type: {
          id: 'type',
          type: 'select',
          select: {
            name: process.env.NOTION_REQUIRED_TYPE,
          },
        },
        status: {
          id: 'status',
          type: 'status',
          status: {
            name: process.env.NOTION_REQUIRED_STATUS,
          },
        },
      },
    })
  }

  if (typeof url === 'string' && url.includes('/dispatches')) {
    const body = options.body ? JSON.parse(options.body) : null
    return jsonResponse(
      {
        ok: true,
        message: 'Mocked GitHub dispatch accepted',
        received: body,
      },
      204,
    )
  }

  throw new Error(`Unexpected fetch target: ${url}`)
}

try {
  const payload = {
    id: '1782edd6-a853-4d4a-b02c-9c8c16f28e53',
    type: 'page.properties_updated',
    entity: {
      id: pageId,
      type: 'page',
    },
    data: {
      updated_properties: ['status'],
    },
  }

  const rawBody = JSON.stringify(payload)
  const signature = await createSignature(rawBody, verificationToken)
  const request = new Request('http://localhost/api/notion-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Notion-Signature': signature,
    },
    body: rawBody,
  })

  const response = await webhook.fetch(request)
  const text = await response.text()

  console.log(`status=${response.status}`)
  console.log(text)
} finally {
  globalThis.fetch = originalFetch
}

async function createSignature(rawBody, token) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(token),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(rawBody),
  )

  return `sha256=${toHex(signature)}`
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
}

function jsonResponse(payload, status = 200) {
  return new Response(status === 204 ? null : JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
