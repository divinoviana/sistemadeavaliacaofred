-- =====================================================================
-- Admins / Professores — criar contas em auth.users
-- =====================================================================
-- Cria as 7 contas administrativas que o app reconhece como admin
-- (lista hardcoded em data_admin.ts e na função is_admin()).
-- Idempotente: se a conta já existir (por email), pula.
-- =====================================================================

do $$
declare
  admins record;
begin
  for admins in
    select * from (values
      ('divinoviana@gmail.com',                'admin123'),
      ('admin@admin.com',                       'admin123'),
      ('divino.viana@professor.to.gov.br',      'admin123'),
      ('filosofia@frederico.edu.br',            'fred@fred2026'),
      ('geografia@frederico.edu.br',            'fred@fred2026'),
      ('historia@frederico.edu.br',             'fred@fred2026'),
      ('sociologia@frederico.edu.br',           'fred@fred2026')
    ) as t(email, password)
  loop
    -- Pula se o email já existe em auth.users
    if exists (select 1 from auth.users where lower(email) = lower(admins.email)) then
      raise notice 'admin já existe: %', admins.email;
      continue;
    end if;

    declare
      v_id uuid := gen_random_uuid();
    begin
      insert into auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data,
        is_super_admin, confirmation_token, recovery_token,
        email_change_token_new, email_change
      ) values (
        '00000000-0000-0000-0000-000000000000',
        v_id,
        'authenticated',
        'authenticated',
        lower(admins.email),
        crypt(admins.password, gen_salt('bf')),
        now(), now(), now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        jsonb_build_object('role','admin'),
        false, '', '', '', ''
      );

      insert into auth.identities (
        provider_id, user_id, identity_data, provider,
        last_sign_in_at, created_at, updated_at
      ) values (
        v_id::text, v_id,
        jsonb_build_object('sub', v_id::text, 'email', lower(admins.email), 'email_verified', true),
        'email', null, now(), now()
      );

      -- Cria também perfil em public.students com role='admin'
      insert into public.students (id, name, email, school_class, grade, role, password)
      values (
        v_id,
        case admins.email
          when 'divinoviana@gmail.com'                then 'Prof. Divino Viana'
          when 'admin@admin.com'                       then 'Administrador'
          when 'divino.viana@professor.to.gov.br'      then 'Prof. Divino Viana'
          when 'filosofia@frederico.edu.br'            then 'Prof. Filosofia'
          when 'geografia@frederico.edu.br'            then 'Prof. Geografia'
          when 'historia@frederico.edu.br'             then 'Prof. História'
          when 'sociologia@frederico.edu.br'           then 'Prof. Sociologia'
          else 'Administrador'
        end,
        lower(admins.email),
        'N/A',
        'N/A',
        'admin',
        admins.password
      ) on conflict (id) do nothing;

      raise notice 'admin criado: %', admins.email;
    end;
  end loop;
end $$;

-- Verificação
select email, raw_user_meta_data ->> 'role' as role, created_at
  from auth.users
 where lower(email) in (
   'divinoviana@gmail.com',
   'admin@admin.com',
   'divino.viana@professor.to.gov.br',
   'filosofia@frederico.edu.br',
   'geografia@frederico.edu.br',
   'historia@frederico.edu.br',
   'sociologia@frederico.edu.br'
 )
 order by email;
