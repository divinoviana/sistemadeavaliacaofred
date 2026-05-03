-- =====================================================================
-- Hotfix: completar schema de bimonthly_exams
-- =====================================================================
-- Adiciona colunas que o app usa para simulados manuais:
--   - title         (texto curto do simulado)
--   - school_class  (turma alvo; null = todas turmas da série)
-- Idempotente.
-- =====================================================================

alter table public.bimonthly_exams
  add column if not exists title         text,
  add column if not exists school_class  text;

create index if not exists bimonthly_exams_grade_subject_idx
  on public.bimonthly_exams(grade, subject);

create index if not exists bimonthly_exams_school_class_idx
  on public.bimonthly_exams(school_class);

-- Recarregar schema cache do PostgREST
notify pgrst, 'reload schema';

-- Verificação
select column_name, data_type
  from information_schema.columns
 where table_schema = 'public' and table_name = 'bimonthly_exams'
 order by ordinal_position;
