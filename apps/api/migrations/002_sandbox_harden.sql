-- Harden sandbox role on existing databases (run manually if volume already initialized)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'syntaxia_sandbox') THEN
        CREATE ROLE syntaxia_sandbox LOGIN PASSWORD 'syntaxia_sandbox';
    END IF;
END
$$;

DO $$
BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO syntaxia_sandbox', current_database());
END
$$;
REVOKE ALL ON SCHEMA public FROM syntaxia_sandbox;
GRANT USAGE ON SCHEMA public TO syntaxia_sandbox;
DO $$
BEGIN
  ALTER ROLE syntaxia_sandbox NOSUPERUSER NOCREATEDB NOCREATEROLE;
EXCEPTION
  WHEN insufficient_privilege THEN
    ALTER ROLE syntaxia_sandbox NOCREATEDB NOCREATEROLE;
END
$$;

DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM syntaxia_sandbox', r.tablename);
  END LOOP;
END
$$;
