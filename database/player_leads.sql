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
  image_purpose text,
  contact_consent boolean not null default false,
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
  add column if not exists image_purpose text,
  add column if not exists contact_consent boolean not null default false;

create index if not exists player_leads_created_at_idx
  on public.player_leads (created_at desc);

create index if not exists player_leads_email_idx
  on public.player_leads (lower(email));

grant insert, select on table public.player_leads to service_role;

alter table public.player_leads enable row level security;

drop policy if exists "Only service role can manage player leads" on public.player_leads;
drop policy if exists "Service role can read player leads" on public.player_leads;

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
