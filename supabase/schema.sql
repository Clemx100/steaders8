-- Steaders8 Investor Portal schema
-- Paste this whole file into Supabase Dashboard > SQL Editor and click Run.
-- It is safe to run once on a fresh project.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('investor', 'admin');
create type public.account_status as enum ('pending', 'approved', 'rejected');
create type public.investment_status as enum ('pending', 'confirmed', 'rejected');
create type public.season_stage as enum (
  'awaiting_start',
  'nursery',
  'transplanted',
  'planted',
  'growing',
  'harvesting',
  'route_to_market',
  'sold',
  'paid_out',
  'completed'
);

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text not null default '',
  address text not null default '',
  state text not null default '',
  occupation text not null default '',
  bank_name text not null default '',
  account_number text not null default '',
  account_name text not null default '',
  next_of_kin_name text not null default '',
  next_of_kin_phone text not null default '',
  role public.user_role not null default 'investor',
  status public.account_status not null default 'pending',
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('crop', 'livestock')),
  description text not null default '',
  image text not null default '',
  expected_roi_percent numeric,
  min_amount numeric not null default 0,
  is_open boolean not null default true,
  stages public.season_stage[] not null default array[
    'awaiting_start', 'planted', 'growing', 'harvesting', 'route_to_market', 'sold', 'paid_out', 'completed'
  ]::public.season_stage[],
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  label text not null,
  stage public.season_stage not null default 'awaiting_start',
  stage_started_at timestamptz not null default now(),
  stage_ends_at timestamptz,
  started_at timestamptz,
  is_current boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index seasons_one_current_per_project
  on public.seasons (project_id) where is_current;

create table public.season_updates (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.seasons (id) on delete cascade,
  stage public.season_stage,
  title text not null,
  message text not null default '',
  created_at timestamptz not null default now()
);

create table public.investments (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.profiles (id) on delete cascade,
  project_id uuid not null references public.projects (id),
  season_id uuid references public.seasons (id),
  amount numeric not null check (amount > 0),
  proof_path text,
  status public.investment_status not null default 'pending',
  admin_note text not null default '',
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  investment_id uuid not null references public.investments (id) on delete cascade,
  amount numeric not null check (amount > 0),
  note text not null default '',
  sent_at timestamptz not null default now(),
  confirmed_by_investor_at timestamptz
);

create index investments_investor_idx on public.investments (investor_id);
create index payouts_investment_idx on public.payouts (investment_id);
create index season_updates_season_idx on public.season_updates (season_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_approved_investor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and status = 'approved');
$$;

-- Creates a pending profile from the sign-up form data.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles (
    id, email, full_name, phone, address, state, occupation,
    bank_name, account_number, account_name, next_of_kin_name, next_of_kin_phone
  ) values (
    new.id,
    coalesce(new.email, ''),
    coalesce(meta ->> 'full_name', ''),
    coalesce(meta ->> 'phone', ''),
    coalesce(meta ->> 'address', ''),
    coalesce(meta ->> 'state', ''),
    coalesce(meta ->> 'occupation', ''),
    coalesce(meta ->> 'bank_name', ''),
    coalesce(meta ->> 'account_number', ''),
    coalesce(meta ->> 'account_name', ''),
    coalesce(meta ->> 'next_of_kin_name', ''),
    coalesce(meta ->> 'next_of_kin_phone', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Investors confirm a payout they received. Only their own, only once.
create or replace function public.confirm_payout(payout_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.payouts p
     set confirmed_by_investor_at = now()
    from public.investments i
   where p.id = payout_id
     and p.investment_id = i.id
     and i.investor_id = auth.uid()
     and p.confirmed_by_investor_at is null;

  if not found then
    raise exception 'Payout not found or already confirmed';
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.seasons enable row level security;
alter table public.season_updates enable row level security;
alter table public.investments enable row level security;
alter table public.payouts enable row level security;

create policy "profiles: read own or admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles: admin update" on public.profiles
  for update using (public.is_admin());

create policy "projects: read all" on public.projects
  for select using (true);
create policy "projects: admin write" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

create policy "seasons: read signed in" on public.seasons
  for select using (auth.uid() is not null);
create policy "seasons: admin write" on public.seasons
  for all using (public.is_admin()) with check (public.is_admin());

create policy "season_updates: read signed in" on public.season_updates
  for select using (auth.uid() is not null);
create policy "season_updates: admin write" on public.season_updates
  for all using (public.is_admin()) with check (public.is_admin());

create policy "investments: read own or admin" on public.investments
  for select using (investor_id = auth.uid() or public.is_admin());
create policy "investments: approved investor creates pending" on public.investments
  for insert with check (
    investor_id = auth.uid()
    and public.is_approved_investor()
    and status = 'pending'
    and season_id is null
    and confirmed_at is null
  );
create policy "investments: admin write" on public.investments
  for all using (public.is_admin()) with check (public.is_admin());

create policy "payouts: read own or admin" on public.payouts
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.investments i
      where i.id = payouts.investment_id and i.investor_id = auth.uid()
    )
  );
create policy "payouts: admin write" on public.payouts
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: private bucket for proof of payment uploads
-- Files are stored as <user_id>/<filename>
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', false)
on conflict (id) do nothing;

create policy "proofs: investor uploads own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'payment-proofs' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "proofs: read own or admin" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'payment-proofs'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- ---------------------------------------------------------------------------
-- Seed projects and their first season
-- ---------------------------------------------------------------------------
insert into public.projects (slug, name, category, description, image, min_amount, is_open, stages, sort_order) values
  ('greenhouse', 'Greenhouse Expansion', 'crop',
   'Bell Pepper and Super Habanero grown in four greenhouses with drip irrigation.',
   '/upcoming/bell-pepper-greenhouse.png', 3000000, true,
   array['awaiting_start', 'nursery', 'transplanted', 'harvesting', 'route_to_market', 'sold', 'paid_out', 'completed']::public.season_stage[],
   1),
  ('cucumber', 'Cucumber Farming', 'crop',
   'Year-round cucumber production for supermarkets and wholesalers.',
   '/cucumber.png', 0, true,
   array['awaiting_start', 'planted', 'growing', 'harvesting', 'route_to_market', 'sold', 'paid_out', 'completed']::public.season_stage[],
   2),
  ('sweet-corn', 'Sweet Corn Farming', 'crop',
   'Year-round sweet corn production.',
   '/sweet-corn.png', 0, true,
   array['awaiting_start', 'planted', 'growing', 'harvesting', 'route_to_market', 'sold', 'paid_out', 'completed']::public.season_stage[],
   3),
  ('yam', 'Yam Farming', 'crop',
   '2026 season. Investment window closed 8th May 2026.',
   '/yam.png', 0, false,
   array['awaiting_start', 'planted', 'growing', 'harvesting', 'route_to_market', 'sold', 'paid_out', 'completed']::public.season_stage[],
   4),
  ('goat', 'Goat Farming', 'livestock',
   'Goats raised for meat and breeding markets. Open year-round.',
   '/goat-farming.png', 0, true,
   array['awaiting_start', 'growing', 'route_to_market', 'sold', 'paid_out', 'completed']::public.season_stage[],
   5);

insert into public.seasons (project_id, label)
select id, name || ' - ' || extract(year from now())::text || ' Season 1'
from public.projects;

-- ---------------------------------------------------------------------------
-- Make yourself super admin (run AFTER you register on the website):
--
--   update public.profiles
--      set role = 'admin', status = 'approved', approved_at = now()
--    where email = 'your-email@example.com';
-- ---------------------------------------------------------------------------
