-- Jalankan di Supabase Dashboard → SQL Editor.

-- ============ Table ============
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  img text not null,
  "desc" text not null default '',
  link text not null default '#',
  stack text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects
  for select using (true);

drop policy if exists "projects admin write" on public.projects;
create policy "projects admin write" on public.projects
  for all to authenticated using (true) with check (true);

-- ============ Storage (gambar project) ============
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "project images admin insert" on storage.objects;
create policy "project images admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-images');

drop policy if exists "project images admin update" on storage.objects;
create policy "project images admin update" on storage.objects
  for update to authenticated using (bucket_id = 'project-images');

drop policy if exists "project images admin delete" on storage.objects;
create policy "project images admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'project-images');
