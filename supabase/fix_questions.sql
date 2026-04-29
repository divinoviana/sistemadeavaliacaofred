-- =====================================================================
-- Hotfix: adicionar coluna lesson_id em public.questions
-- =====================================================================
-- O migration.sql original não criou essa coluna, mas o app a usa
-- intensamente para vincular cada questão à aula publicada pelo professor.
-- Idempotente: pode rodar várias vezes sem efeito colateral.
-- =====================================================================

alter table public.questions
  add column if not exists lesson_id text;

create index if not exists questions_lesson_id_idx on public.questions(lesson_id);
create index if not exists questions_subject_idx   on public.questions(subject);
create index if not exists questions_topic_idx     on public.questions(topic);

-- Força o PostgREST a recarregar o schema cache imediatamente.
-- Sem isso, o erro "Could not find the 'lesson_id' column of 'questions'
-- in the schema cache" pode persistir por alguns minutos.
notify pgrst, 'reload schema';

-- Verificação
select column_name, data_type
  from information_schema.columns
 where table_schema = 'public' and table_name = 'questions'
 order by ordinal_position;
