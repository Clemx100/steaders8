-- Run in Supabase SQL Editor if the live database was created before certificates.
alter table public.investments
  add column if not exists certificate_code text;

create unique index if not exists investments_certificate_code_uidx
  on public.investments (certificate_code)
  where certificate_code is not null;
