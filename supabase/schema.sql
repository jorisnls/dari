-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- One generic table holds all synced learning data (cards, lessons, activity, settings).

create table if not exists public.sync_items (
  user_id    uuid   not null default auth.uid() references auth.users on delete cascade,
  kind       text   not null,
  key        text   not null,
  data       jsonb  not null,
  updated_at bigint not null,
  primary key (user_id, kind, key)
);

alter table public.sync_items enable row level security;

drop policy if exists "own rows" on public.sync_items;
create policy "own rows" on public.sync_items
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
