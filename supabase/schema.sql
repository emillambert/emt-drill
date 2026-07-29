-- EMT Drill schema (optional). V1 stores progress in localStorage.
-- Connect Supabase later for multi-device sync and uploaded course materials.

create extension if not exists "pgcrypto";

create table if not exists public.scenarios (
  id text primary key,
  title text not null,
  category text not null,
  difficulty text not null,
  focus text not null default 'nremt',
  payload jsonb not null,
  source_scope text not null check (source_scope in ('national', 'local')),
  source_label text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.rapid_questions (
  id text primary key,
  category text not null,
  payload jsonb not null,
  source_scope text not null check (source_scope in ('national', 'local')),
  created_at timestamptz not null default now()
);

create table if not exists public.skill_orders (
  id text primary key,
  category text not null,
  payload jsonb not null,
  source_scope text not null check (source_scope in ('national', 'local')),
  created_at timestamptz not null default now()
);

create table if not exists public.study_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('slides', 'textbook', 'study_guide', 'local_protocol')),
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.generated_items (
  id uuid primary key default gen_random_uuid(),
  material_id uuid references public.study_materials(id) on delete cascade,
  item_type text not null check (item_type in ('scenario', 'rapid', 'skill')),
  payload jsonb not null,
  source_passage text not null,
  source_scope text not null check (source_scope in ('national', 'local')),
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  mode text not null check (mode in ('scenario', 'rapid', 'skill')),
  item_id text not null,
  category text not null,
  score_percent int,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.scenarios enable row level security;
alter table public.rapid_questions enable row level security;
alter table public.skill_orders enable row level security;
alter table public.study_materials enable row level security;
alter table public.generated_items enable row level security;
alter table public.attempts enable row level security;

create policy "Public read curriculum"
  on public.scenarios for select
  to anon, authenticated
  using (true);

create policy "Public read rapid"
  on public.rapid_questions for select
  to anon, authenticated
  using (true);

create policy "Public read skills"
  on public.skill_orders for select
  to anon, authenticated
  using (true);

create policy "Users manage own materials"
  on public.study_materials for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users read generated from own materials"
  on public.generated_items for select
  to authenticated
  using (
    exists (
      select 1 from public.study_materials m
      where m.id = material_id and m.user_id = auth.uid()
    )
  );

create policy "Users manage own attempts"
  on public.attempts for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
