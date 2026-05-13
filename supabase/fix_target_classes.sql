-- =====================================================================
-- Hotfix: segmentação por múltiplas turmas
-- =====================================================================
-- Hoje `bimonthly_exams.school_class` e `activities.school_class` aceitam
-- apenas UMA turma (ou null = todas). Para permitir que o professor envie
-- para várias turmas selecionadas (mas não todas), adicionamos uma coluna
-- nova `school_classes` (jsonb com array de strings).
--
-- Convenção de filtragem usada pelo app:
--   1. Se `school_classes` é array com pelo menos 1 elemento → aluno só vê
--      se sua turma está nele;
--   2. Senão, se `school_class` está preenchido → aluno só vê se for igual
--      à sua turma (modo legado, uma turma só);
--   3. Senão (ambos null/vazio) → todas as turmas da série veem.
-- Idempotente.
-- =====================================================================

alter table public.bimonthly_exams
  add column if not exists school_classes jsonb;

alter table public.activities
  add column if not exists school_classes jsonb;

create index if not exists bimonthly_exams_school_classes_idx
  on public.bimonthly_exams using gin (school_classes);

create index if not exists activities_school_classes_idx
  on public.activities using gin (school_classes);

notify pgrst, 'reload schema';

-- Verificação
select
  table_name, column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and column_name in ('school_class', 'school_classes')
order by table_name, column_name;
