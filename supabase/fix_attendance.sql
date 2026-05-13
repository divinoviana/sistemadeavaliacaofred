-- =====================================================================
-- Frequência por geolocalização
-- =====================================================================
-- Cria 2 tabelas novas:
--
--   public.school_locations
--     Configuração da posição da escola (lat/lng/raio em metros).
--     Em geral só haverá uma row, mas o sistema permite múltiplas
--     (ex.: campus diferente).
--
--   public.attendance_records
--     Registros individuais de presença marcada pelos alunos via app,
--     com a lat/lng coletada do navegador no momento da marcação.
--
-- RLS:
--   school_locations  : leitura pública (aluno precisa saber a posição
--                       da escola pra validar), escrita só admin.
--   attendance_records: aluno só pode INSERIR/LER os próprios registros;
--                       admin lê tudo.
-- Idempotente.
-- =====================================================================

create table if not exists public.school_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Escola',
  address text,
  latitude double precision not null,
  longitude double precision not null,
  radius_meters integer not null default 150,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  student_name text,
  school_class text,
  grade text,
  latitude double precision,
  longitude double precision,
  accuracy_meters numeric,
  distance_meters numeric,
  status text not null default 'present' check (status in ('present','absent','remote','manual')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists attendance_records_student_idx on public.attendance_records(student_id);
create index if not exists attendance_records_created_at_idx on public.attendance_records(created_at desc);
create index if not exists attendance_records_school_class_idx on public.attendance_records(school_class);

-- RLS
alter table public.school_locations  enable row level security;
alter table public.attendance_records enable row level security;

-- school_locations
drop policy if exists school_locations_select on public.school_locations;
create policy school_locations_select on public.school_locations
  for select to anon, authenticated using (true);

drop policy if exists school_locations_write on public.school_locations;
create policy school_locations_write on public.school_locations
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- attendance_records
drop policy if exists attendance_select on public.attendance_records;
create policy attendance_select on public.attendance_records
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

drop policy if exists attendance_insert on public.attendance_records;
create policy attendance_insert on public.attendance_records
  for insert to authenticated
  with check (student_id = auth.uid() or public.is_admin());

drop policy if exists attendance_update on public.attendance_records;
create policy attendance_update on public.attendance_records
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists attendance_delete on public.attendance_records;
create policy attendance_delete on public.attendance_records
  for delete to authenticated using (public.is_admin());

-- Recarregar schema cache do PostgREST
notify pgrst, 'reload schema';

-- Verificação
select
  table_name,
  column_name,
  data_type
from information_schema.columns
where table_schema = 'public'
  and table_name in ('school_locations', 'attendance_records')
order by table_name, ordinal_position;
