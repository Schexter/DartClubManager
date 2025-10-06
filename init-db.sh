#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER dartclub_user WITH PASSWORD 'postgres';
    GRANT ALL PRIVILEGES ON DATABASE dartclub TO dartclub_user;
    GRANT ALL ON SCHEMA public TO dartclub_user;
EOSQL

echo "User dartclub_user has been created successfully"
