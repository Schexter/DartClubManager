-- Ensure dartclub_user exists and has the expected password and privileges
DO
$$
BEGIN
    -- Create user if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'dartclub_user') THEN
        CREATE ROLE dartclub_user LOGIN PASSWORD 'dartclub_password';
    ELSE
        ALTER ROLE dartclub_user WITH LOGIN PASSWORD 'dartclub_password';
    END IF;
END
$$;

-- Grant privileges on the database and schema
GRANT ALL PRIVILEGES ON DATABASE dartclub TO dartclub_user;
\connect dartclub
GRANT ALL ON SCHEMA public TO dartclub_user;
