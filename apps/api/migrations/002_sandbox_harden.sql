-- Harden sandbox role on existing databases (run manually if volume already initialized)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'syntaxia_sandbox') THEN
        CREATE ROLE syntaxia_sandbox LOGIN PASSWORD 'syntaxia_sandbox';
    END IF;
END
$$;

GRANT CONNECT ON DATABASE syntaxia TO syntaxia_sandbox;
REVOKE ALL ON SCHEMA public FROM syntaxia_sandbox;
GRANT USAGE ON SCHEMA public TO syntaxia_sandbox;
ALTER ROLE syntaxia_sandbox NOSUPERUSER NOCREATEDB NOCREATEROLE;

DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM syntaxia_sandbox', r.tablename);
  END LOOP;
END
$$;
