# Supabase Player Leads Setup

This site saves popup entries through `app/api/player-leads/route.ts`.

## 1. Create the Supabase Project

Create a free Supabase project, then open the project dashboard.

## 2. Create the Table

Open SQL Editor and run:

```sql
-- database/player_leads.sql
```

Paste the contents of `database/player_leads.sql` into the editor and run it.

The table is `public.player_leads`.

The SQL also grants `insert`, `select`, and `update` access to Supabase's `service_role`. This is
required for newer Supabase projects where new tables are not automatically
exposed through the REST/Data API.

## 3. Add Environment Variables

In local development, create `.env.local`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Some newer Supabase projects may label the server key as:

```env
SUPABASE_SECRET_KEY=your-secret-key
```

The API route supports either key name.

Your current `.env.local` must use the real key from:

```txt
Supabase Dashboard -> Project Settings -> API Keys
```

Do not leave `your_secret_key_here` in `.env.local`; the login popup will return
`Player lead database is not configured` until the real server key is present.

For production, add the same values in the hosting provider's environment
variables.

## 4. Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY` in browser code.
- Do not prefix the secret key with `NEXT_PUBLIC_`.
- The table uses Row Level Security.
- Submissions go through the server route, so visitors never receive the secret key.

## 5. Test

Start the site, submit the popup, then check Supabase Table Editor:

```txt
Table Editor -> player_leads
```

You should see name, email, optional Fortnite name, source path, browser user
agent, optional Discord name, avatar style, favorite map, message, uploaded
image details, developer interest details, contact consent, and created
timestamp.

Returning-member login checks the latest row for that email. New-member signup
updates an existing email profile instead of creating duplicate rows.

The form limits uploads to 1.5 MB. Image bytes are not stored in the database.
To save uploads, create a Supabase Storage bucket and add this environment
variable locally and on the server:

```env
SUPABASE_STORAGE_BUCKET=player-lead-images
```

Uploaded image paths are saved in the `image_url` column.

## 6. Optional Welcome Email

The API route can send a short thank-you email after a player joins. It uses
Resend's HTTP API, so no extra package is required.

Add these environment variables locally and on the server:

```env
RESEND_API_KEY=your-resend-api-key
WELCOME_EMAIL_FROM=NLDEVS <hello@nldevs.ca>
WELCOME_EMAIL_REPLY_TO=nldevsmtl@gmail.com
```

`WELCOME_EMAIL_FROM` must be an address/domain verified in Resend. If these
variables are missing, the signup still saves normally and the email is skipped.
