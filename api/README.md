# Notion Webhook on Vercel

This project exposes a Vercel Function at `/api/notion-webhook` that receives
Notion integration webhooks and triggers GitHub Actions with `repository_dispatch`.

The repository also includes a local smoke test and a `vercel.json` file so you can
deploy and validate the flow with less manual setup.

## Flow

1. Notion sends `page.properties_updated` events to `/api/notion-webhook`.
2. The function validates the webhook signature.
3. The function fetches the latest page data from Notion.
4. The function only dispatches GitHub when:
   - `type` equals `Post`
   - `status` equals `published`
5. GitHub receives a `repository_dispatch` event with type `notion_publish`.

## Environment Variables

Required:

- `NOTION_INTERNAL_TOKEN`
- `NOTION_VERIFICATION_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_TOKEN`

Optional:

- `GITHUB_EVENT_TYPE` default: `notion_publish`
- `NOTION_ALLOWED_DATABASE_IDS` comma-separated allowlist
- `NOTION_TYPE_PROPERTY` default: `type`
- `NOTION_REQUIRED_TYPE` default: `Post`
- `NOTION_STATUS_PROPERTY` default: `status`
- `NOTION_REQUIRED_STATUS` default: `published`
- `NOTION_TITLE_PROPERTY` default: `title`

## Setup

1. Import this repository into Vercel as an `Other` framework project.
2. Vercel will use [vercel.json](/Users/matrixcore/Desktop/elog/vercel.json) to treat this as a standard Functions project.
3. Copy [`.env.vercel.example`](/Users/matrixcore/Desktop/elog/.env.vercel.example) into your Vercel environment variables and fill in the real values.
4. Deploy the project once so the function URL exists.
4. In Notion integration settings, create a webhook subscription pointing to:

   `https://<your-vercel-domain>/api/notion-webhook`

5. Subscribe to `page.properties_updated`.
6. When Notion sends the verification request, open the Vercel Function logs and copy the `verification_token`.
7. Paste that token into Notion's verification modal.
8. Save the same token in Vercel as `NOTION_VERIFICATION_TOKEN`.
9. Redeploy so the verification token is live in the function environment.
10. Share the target database with the same Notion integration.

## Local Smoke Test

Before deploying, you can run a local end-to-end simulation:

```bash
yarn test:notion-webhook
```

This script:

- Generates a signed `page.properties_updated` payload
- Mocks the Notion page lookup
- Mocks the GitHub `repository_dispatch` call
- Verifies that the function returns a successful dispatch response

## Notes

- The function re-fetches the page from Notion so decisions are made from the latest page state.
- If your title property is not named `title`, the function falls back to the first property of type `title`.
- If you only want one or two databases to trigger sync, set `NOTION_ALLOWED_DATABASE_IDS`.
- The local smoke test does not call real Notion or GitHub APIs; it only verifies your function logic.
