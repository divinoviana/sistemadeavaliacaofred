-- =====================================================================
-- Hotfix: suporte a Redações
-- =====================================================================
-- Adiciona a coluna `type` em bimonthly_exams para distinguir entre
--   - 'exam'  (simulado bimestral com questões)
--   - 'essay' (redação dissertativa: título + texto livre)
--
-- Submissões de redação vão na mesma tabela `submissions`. O `content`
-- jsonb passa a guardar também `tab_switches` (quantas vezes o aluno
-- saiu da tela durante a redação — métrica de segurança).
-- Idempotente.
-- =====================================================================

alter table public.bimonthly_exams
  add column if not exists type text not null default 'exam';

-- Constraint pra limitar valores válidos
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'bimonthly_exams_type_check'
  ) then
    alter table public.bimonthly_exams
      add constraint bimonthly_exams_type_check check (type in ('exam', 'essay'));
  end if;
end $$;

create index if not exists bimonthly_exams_type_idx on public.bimonthly_exams(type);

-- Recarregar schema cache do PostgREST
notify pgrst, 'reload schema';

-- Verificação
select column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public' and table_name = 'bimonthly_exams' and column_name = 'type';
