create extension if not exists pgcrypto;

create table if not exists public.player_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  fortnite_name text,
  discord_name text,
  avatar_style text,
  favorite_map text,
  message text,
  image_name text,
  image_type text,
  image_data text,
  image_url text,
  image_purpose text,
  developer_interest boolean not null default false,
  developer_role text,
  developer_portfolio text,
  developer_skills text,
  developer_availability text,
  member_goals text,
  contact_consent boolean not null default false,
  age_attestation boolean not null default false,
  email_confirmed boolean not null default false,
  email_confirmed_at timestamptz,
  email_confirmation_token_hash text,
  email_confirmation_sent_at timestamptz,
  signup_locale text not null default 'en',
  preferred_email_locale text,
  marketing_unsubscribed boolean not null default false,
  marketing_unsubscribed_at timestamptz,
  marketing_unsubscribe_token_hash text,
  admin_status text not null default 'new',
  admin_tags text,
  admin_notes text,
  contacted_at timestamptz,
  last_reviewed_at timestamptz,
  source_path text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.player_leads
  add column if not exists discord_name text,
  add column if not exists avatar_style text,
  add column if not exists favorite_map text,
  add column if not exists message text,
  add column if not exists image_name text,
  add column if not exists image_type text,
  add column if not exists image_data text,
  add column if not exists image_url text,
  add column if not exists image_purpose text,
  add column if not exists developer_interest boolean not null default false,
  add column if not exists developer_role text,
  add column if not exists developer_portfolio text,
  add column if not exists developer_skills text,
  add column if not exists developer_availability text,
  add column if not exists member_goals text,
  add column if not exists contact_consent boolean not null default false,
  add column if not exists age_attestation boolean not null default false,
  add column if not exists email_confirmed boolean not null default false,
  add column if not exists email_confirmed_at timestamptz,
  add column if not exists email_confirmation_token_hash text,
  add column if not exists email_confirmation_sent_at timestamptz,
  add column if not exists signup_locale text not null default 'en',
  add column if not exists preferred_email_locale text,
  add column if not exists marketing_unsubscribed boolean not null default false,
  add column if not exists marketing_unsubscribed_at timestamptz,
  add column if not exists marketing_unsubscribe_token_hash text,
  add column if not exists admin_status text not null default 'new',
  add column if not exists admin_tags text,
  add column if not exists admin_notes text,
  add column if not exists contacted_at timestamptz,
  add column if not exists last_reviewed_at timestamptz;

update public.player_leads
set signup_locale = case
  when source_path ~ '/fr(/|$)' then 'fr'
  when source_path ~ '/pt(/|$)' then 'pt'
  when source_path ~ '/es(/|$)' then 'es'
  when source_path ~ '/ru(/|$)' then 'ru'
  when source_path ~ '/pl(/|$)' then 'pl'
  when source_path ~ '/de(/|$)' then 'de'
  when source_path ~ '/ja(/|$)' then 'ja'
  else signup_locale
end
where source_path is not null;

create index if not exists player_leads_created_at_idx
  on public.player_leads (created_at desc);

create index if not exists player_leads_email_idx
  on public.player_leads (lower(email));

create unique index if not exists player_leads_email_unique_idx
  on public.player_leads (lower(email));

create index if not exists player_leads_admin_status_idx
  on public.player_leads (admin_status);

create index if not exists player_leads_email_confirmation_token_idx
  on public.player_leads (email_confirmation_token_hash);

create index if not exists player_leads_marketing_unsubscribe_token_idx
  on public.player_leads (marketing_unsubscribe_token_hash);

grant insert, select, update on table public.player_leads to service_role;

alter table public.player_leads enable row level security;

drop policy if exists "Only service role can manage player leads" on public.player_leads;
drop policy if exists "Service role can read player leads" on public.player_leads;
drop policy if exists "Service role can update player leads" on public.player_leads;

create policy "Only service role can manage player leads"
  on public.player_leads
  for insert
  to service_role
  with check (true);

create policy "Service role can read player leads"
  on public.player_leads
  for select
  to service_role
  using (true);

create policy "Service role can update player leads"
  on public.player_leads
  for update
  to service_role
  using (true)
  with check (true);
