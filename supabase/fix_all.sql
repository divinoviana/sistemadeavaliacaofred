-- =====================================================================
-- Hotfix consolidado — rode este script no Supabase SQL Editor
-- =====================================================================
-- Cobre 3 problemas reportados:
--   1) Simulados não chegavam aos alunos (faltava coluna `title` em
--      bimonthly_exams → INSERT falhava silenciosamente)
--   2) Anotações comportamentais não salvavam (student_notes não tinha
--      a coluna `category` e tinha `teacher_subject` NOT NULL)
--   3) Categorias precisam ser separadas para o relatório cruzar dados
-- Idempotente.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) bimonthly_exams: title + school_class + topics + visual_content
-- ---------------------------------------------------------------------
alter table public.bimonthly_exams
  add column if not exists title          text,
  add column if not exists school_class   text,
  add column if not exists topics         jsonb,
  add column if not exists visual_content jsonb;

create index if not exists bimonthly_exams_grade_subject_idx
  on public.bimonthly_exams(grade, subject);
create index if not exists bimonthly_exams_school_class_idx
  on public.bimonthly_exams(school_class);

-- ---------------------------------------------------------------------
-- 2) student_notes: category separada + flexibilizar teacher_subject
-- ---------------------------------------------------------------------
alter table public.student_notes
  add column if not exists category text,
  add column if not exists subject  text;

-- Tira o NOT NULL de teacher_subject (caso exista) — assim o app pode
-- gravar simplesmente em subject + category sem se preocupar com legado.
do $$
begin
  if exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'student_notes'
       and column_name = 'teacher_subject' and is_nullable = 'NO'
  ) then
    alter table public.student_notes alter column teacher_subject drop not null;
  end if;
end $$;

-- Constraint do enum de categorias (texto aberto fica permissivo, mas
-- esse check guia o front)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'student_notes_category_check'
  ) then
    alter table public.student_notes
      add constraint student_notes_category_check
      check (category is null or category in ('comportamento','destaque','pedagogico','familiar','saude','geral'));
  end if;
end $$;

create index if not exists student_notes_category_idx on public.student_notes(category);
create index if not exists student_notes_student_id_idx on public.student_notes(student_id);
create index if not exists student_notes_subject_idx on public.student_notes(subject);

-- ---------------------------------------------------------------------
-- 3) Backfill: tenta extrair categoria de anotações antigas que tenham
--    sido salvas com o formato "[categoria] texto"
-- ---------------------------------------------------------------------
update public.student_notes
   set category = lower(substring(content from '^\[([^\]]+)\]')),
       content  = trim(substring(content from '^\[[^\]]+\]\s*(.*)$'))
 where content like '[%]%' and category is null;

-- ---------------------------------------------------------------------
-- Recarregar schema cache do PostgREST
-- ---------------------------------------------------------------------
notify pgrst, 'reload schema';

-- ---------------------------------------------------------------------
-- Verificação
-- ---------------------------------------------------------------------
select 'bimonthly_exams' as tabela, column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public' and table_name = 'bimonthly_exams'
union all
select 'student_notes' as tabela, column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public' and table_name = 'student_notes'
 order by tabela, column_name;
