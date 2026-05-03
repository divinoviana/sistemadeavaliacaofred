-- =====================================================================
-- Portal CHSA — Migração para Supabase
-- =====================================================================
-- Idempotente: pode ser rodado múltiplas vezes sem efeito colateral.
-- Preserva dados existentes (376 students, 5171 submissions, 36 messages).
-- Ative RLS em todas as tabelas e cria políticas de acesso.
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 0) Extensions necessárias
-- ---------------------------------------------------------------------
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- 1) STUDENTS — adicionar colunas faltantes
-- ---------------------------------------------------------------------
alter table public.students
  add column if not exists role text not null default 'student',
  add column if not exists updated_at timestamptz not null default now();

-- garantir constraint de role
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'students_role_check'
  ) then
    alter table public.students
      add constraint students_role_check check (role in ('student','admin'));
  end if;
end $$;

create unique index if not exists students_email_unique on public.students(lower(email));
create index if not exists students_grade_class_idx on public.students(grade, school_class);

-- trigger updated_at
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists students_touch on public.students;
create trigger students_touch
  before update on public.students
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- 2) SUBMISSIONS — adicionar colunas que o app novo usa
-- ---------------------------------------------------------------------
alter table public.submissions
  add column if not exists student_id uuid references public.students(id) on delete set null,
  add column if not exists status text not null default 'completed',
  add column if not exists submitted_at timestamptz,
  add column if not exists lesson_id text,
  add column if not exists grade text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'submissions_status_check'
  ) then
    alter table public.submissions
      add constraint submissions_status_check check (status in ('pending','completed','graded'));
  end if;
end $$;

-- backfill: submitted_at <- submission_date
update public.submissions
   set submitted_at = submission_date
 where submitted_at is null and submission_date is not null;

-- backfill: student_id por match exato (name + school_class)
update public.submissions s
   set student_id = st.id
  from public.students st
 where s.student_id is null
   and s.student_name = st.name
   and s.school_class = st.school_class;

-- backfill: grade a partir da turma do aluno
update public.submissions s
   set grade = st.grade
  from public.students st
 where s.grade is null
   and s.student_id = st.id;

create index if not exists submissions_student_id_idx on public.submissions(student_id);
create index if not exists submissions_subject_idx on public.submissions(subject);
create index if not exists submissions_school_class_idx on public.submissions(school_class);
create index if not exists submissions_lesson_id_idx on public.submissions(lesson_id);

-- ---------------------------------------------------------------------
-- 3) MESSAGES — adicionar receiver_id e read_at
-- ---------------------------------------------------------------------
alter table public.messages
  add column if not exists receiver_id uuid references public.students(id) on delete set null,
  add column if not exists read_at timestamptz;

create index if not exists messages_sender_id_idx on public.messages(sender_id);
create index if not exists messages_receiver_id_idx on public.messages(receiver_id);
create index if not exists messages_subject_class_idx on public.messages(subject, school_class);

-- ---------------------------------------------------------------------
-- 4) Tabelas auxiliares (vazias hoje, mas usadas pelo app)
-- ---------------------------------------------------------------------
create table if not exists public.lesson_overrides (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists lesson_overrides_touch on public.lesson_overrides;
create trigger lesson_overrides_touch
  before update on public.lesson_overrides
  for each row execute function public.touch_updated_at();

create table if not exists public.bimonthly_exams (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  grade text not null,
  bimester text not null,
  title text,
  school_class text,
  topics jsonb,
  questions jsonb,
  visual_content jsonb,
  created_at timestamptz not null default now()
);

-- Garantia idempotente caso a tabela já exista sem essas colunas
alter table public.bimonthly_exams add column if not exists title text;
alter table public.bimonthly_exams add column if not exists school_class text;

create table if not exists public.teacher_profiles (
  id text primary key,
  subject text,
  display_name text,
  data jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists teacher_profiles_touch on public.teacher_profiles;
create trigger teacher_profiles_touch
  before update on public.teacher_profiles
  for each row execute function public.touch_updated_at();

create table if not exists public.student_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  subject text,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists student_notes_student_idx on public.student_notes(student_id);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  lesson_id text,
  title text not null,
  question_ids jsonb,
  visual_content jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  subject text,
  topic text,
  lesson_id text,
  type text check (type in ('objective','discursive')),
  difficulty text check (difficulty in ('Fácil','Médio','Difícil')),
  question_text text not null,
  options jsonb,
  correct_option text,
  explanation text,
  created_at timestamptz not null default now()
);

-- Garantia: caso a tabela já existisse sem lesson_id (instalações antigas)
alter table public.questions add column if not exists lesson_id text;
create index if not exists questions_lesson_id_idx on public.questions(lesson_id);
create index if not exists questions_subject_idx   on public.questions(subject);
create index if not exists questions_topic_idx     on public.questions(topic);

-- activity_submissions e activity_answers (já existem vazias, garante schema)
create table if not exists public.activity_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  activity_id uuid references public.activities(id) on delete cascade,
  status text default 'pending' check (status in ('pending','completed','graded')),
  score numeric,
  submitted_at timestamptz default now()
);

create table if not exists public.activity_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.activity_submissions(id) on delete cascade,
  question_id uuid references public.questions(id) on delete set null,
  answer_text text,
  is_correct boolean,
  score numeric,
  feedback text
);

-- ---------------------------------------------------------------------
-- 5) Função is_admin() — usada nas policies
-- ---------------------------------------------------------------------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public, auth as $$
  select coalesce(
    lower(coalesce(auth.jwt() ->> 'email', '')) = any(array[
      'divinoviana@gmail.com',
      'admin@admin.com',
      'divino.viana@professor.to.gov.br',
      'filosofia@frederico.edu.br',
      'geografia@frederico.edu.br',
      'historia@frederico.edu.br',
      'sociologia@frederico.edu.br'
    ]),
    false
  ) or exists (
    select 1 from public.students
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------
-- 6) Habilitar RLS em todas as tabelas
-- ---------------------------------------------------------------------
alter table public.students             enable row level security;
alter table public.submissions          enable row level security;
alter table public.messages             enable row level security;
alter table public.lesson_overrides     enable row level security;
alter table public.bimonthly_exams      enable row level security;
alter table public.teacher_profiles     enable row level security;
alter table public.student_notes        enable row level security;
alter table public.activities           enable row level security;
alter table public.questions            enable row level security;
alter table public.activity_submissions enable row level security;
alter table public.activity_answers     enable row level security;

-- ---------------------------------------------------------------------
-- 7) Policies — drop+create para idempotência
-- ---------------------------------------------------------------------

-- ---------- STUDENTS ----------
drop policy if exists students_select on public.students;
create policy students_select on public.students
  for select to authenticated using (true);

drop policy if exists students_insert_self on public.students;
create policy students_insert_self on public.students
  for insert to authenticated
  with check (auth.uid() = id or public.is_admin());

drop policy if exists students_update_self on public.students;
create policy students_update_self on public.students
  for update to authenticated
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

drop policy if exists students_delete_admin on public.students;
create policy students_delete_admin on public.students
  for delete to authenticated using (public.is_admin());

-- ---------- SUBMISSIONS ----------
drop policy if exists submissions_select on public.submissions;
create policy submissions_select on public.submissions
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

drop policy if exists submissions_insert on public.submissions;
create policy submissions_insert on public.submissions
  for insert to authenticated
  with check (student_id = auth.uid() or public.is_admin());

drop policy if exists submissions_update on public.submissions;
create policy submissions_update on public.submissions
  for update to authenticated
  using (student_id = auth.uid() or public.is_admin())
  with check (student_id = auth.uid() or public.is_admin());

drop policy if exists submissions_delete on public.submissions;
create policy submissions_delete on public.submissions
  for delete to authenticated using (public.is_admin());

-- ---------- MESSAGES ----------
drop policy if exists messages_select on public.messages;
create policy messages_select on public.messages
  for select to authenticated using (
    sender_id = auth.uid()
    or receiver_id = auth.uid()
    or public.is_admin()
    -- aluno vê respostas do professor para sua turma+matéria
    or (
      is_from_teacher = true
      and exists (
        select 1 from public.students s
        where s.id = auth.uid()
          and s.school_class = messages.school_class
      )
    )
  );

drop policy if exists messages_insert on public.messages;
create policy messages_insert on public.messages
  for insert to authenticated
  with check (sender_id = auth.uid() or public.is_admin());

drop policy if exists messages_update on public.messages;
create policy messages_update on public.messages
  for update to authenticated using (public.is_admin());

drop policy if exists messages_delete on public.messages;
create policy messages_delete on public.messages
  for delete to authenticated using (public.is_admin());

-- ---------- LESSON_OVERRIDES ----------
drop policy if exists lesson_overrides_select on public.lesson_overrides;
create policy lesson_overrides_select on public.lesson_overrides
  for select to anon, authenticated using (true);

drop policy if exists lesson_overrides_write on public.lesson_overrides;
create policy lesson_overrides_write on public.lesson_overrides
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- BIMONTHLY_EXAMS ----------
drop policy if exists bimonthly_exams_select on public.bimonthly_exams;
create policy bimonthly_exams_select on public.bimonthly_exams
  for select to authenticated using (true);

drop policy if exists bimonthly_exams_write on public.bimonthly_exams;
create policy bimonthly_exams_write on public.bimonthly_exams
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- TEACHER_PROFILES ----------
drop policy if exists teacher_profiles_select on public.teacher_profiles;
create policy teacher_profiles_select on public.teacher_profiles
  for select to authenticated using (true);

drop policy if exists teacher_profiles_write on public.teacher_profiles;
create policy teacher_profiles_write on public.teacher_profiles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- STUDENT_NOTES ----------
drop policy if exists student_notes_select on public.student_notes;
create policy student_notes_select on public.student_notes
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

drop policy if exists student_notes_write on public.student_notes;
create policy student_notes_write on public.student_notes
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- ACTIVITIES / QUESTIONS ----------
drop policy if exists activities_select on public.activities;
create policy activities_select on public.activities for select to anon, authenticated using (true);
drop policy if exists activities_write on public.activities;
create policy activities_write on public.activities
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists questions_select on public.questions;
create policy questions_select on public.questions for select to anon, authenticated using (true);
drop policy if exists questions_write on public.questions;
create policy questions_write on public.questions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- ACTIVITY_SUBMISSIONS / ANSWERS ----------
drop policy if exists asubs_select on public.activity_submissions;
create policy asubs_select on public.activity_submissions
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());
drop policy if exists asubs_insert on public.activity_submissions;
create policy asubs_insert on public.activity_submissions
  for insert to authenticated
  with check (student_id = auth.uid() or public.is_admin());
drop policy if exists asubs_update on public.activity_submissions;
create policy asubs_update on public.activity_submissions
  for update to authenticated
  using (student_id = auth.uid() or public.is_admin())
  with check (student_id = auth.uid() or public.is_admin());
drop policy if exists asubs_delete on public.activity_submissions;
create policy asubs_delete on public.activity_submissions
  for delete to authenticated using (public.is_admin());

drop policy if exists aans_select on public.activity_answers;
create policy aans_select on public.activity_answers
  for select to authenticated using (
    public.is_admin() or exists (
      select 1 from public.activity_submissions s
      where s.id = activity_answers.submission_id and s.student_id = auth.uid()
    )
  );
drop policy if exists aans_write on public.activity_answers;
create policy aans_write on public.activity_answers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

commit;

-- =====================================================================
-- 8) MIGRAÇÃO DOS 376 ALUNOS PARA auth.users
-- =====================================================================
-- Roda em bloco separado (fora da transação principal) para que falhas
-- isoladas em alguns alunos não revertam o schema todo.
-- =====================================================================

do $$
declare
  s record;
  v_count int := 0;
begin
  for s in
    select id, email, password
      from public.students
     where email is not null
       and password is not null
       and length(password) > 0
       and not exists (select 1 from auth.users u where u.id = students.id)
       and not exists (select 1 from auth.users u where lower(u.email) = lower(students.email))
  loop
    begin
      insert into auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data,
        is_super_admin, confirmation_token, recovery_token,
        email_change_token_new, email_change
      ) values (
        '00000000-0000-0000-0000-000000000000',
        s.id,
        'authenticated',
        'authenticated',
        lower(s.email),
        crypt(s.password, gen_salt('bf')),
        now(), now(), now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{}'::jsonb,
        false, '', '', '', ''
      );

      insert into auth.identities (
        provider_id, user_id, identity_data, provider,
        last_sign_in_at, created_at, updated_at
      ) values (
        s.id::text,
        s.id,
        jsonb_build_object('sub', s.id::text, 'email', lower(s.email), 'email_verified', true),
        'email',
        null, now(), now()
      );

      v_count := v_count + 1;
    exception when others then
      raise notice 'falhou aluno %: %', s.email, sqlerrm;
    end;
  end loop;
  raise notice 'migrados % alunos para auth.users', v_count;
end $$;

-- =====================================================================
-- 9) Verificações finais (consultas informativas — não alteram nada)
-- =====================================================================
select 'students total'        as label, count(*) from public.students
union all
select 'students em auth.users', count(*) from auth.users u where exists (select 1 from public.students s where s.id = u.id)
union all
select 'submissions total',     count(*) from public.submissions
union all
select 'submissions com FK',    count(*) from public.submissions where student_id is not null
union all
select 'submissions sem FK',    count(*) from public.submissions where student_id is null
union all
select 'messages total',        count(*) from public.messages;
