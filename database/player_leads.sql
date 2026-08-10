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
  add column if not exists admin_status text not null default 'new',
  add column if not exists admin_tags text,
  add column if not exists admin_notes text,
  add column if not exists contacted_at timestamptz,
  add column if not exists last_reviewed_at timestamptz;

create index if not exists player_leads_created_at_idx
  on public.player_leads (created_at desc);

create index if not exists player_leads_email_idx
  on public.player_leads (lower(email));

create index if not exists player_leads_admin_status_idx
  on public.player_leads (admin_status);

create index if not exists player_leads_email_confirmation_token_idx
  on public.player_leads (email_confirmation_token_hash);

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
