#!/bin/bash
set -e

# Konfiguriere pg_hba.conf für MD5-Authentifizierung
cat > /var/lib/postgresql/data/pgdata/pg_hba.conf <<EOF
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
host    all             all             0.0.0.0/0               md5
EOF

# Gebe alle Rechte (User wurde bereits von PostgreSQL erstellt)
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE dartclub TO dartclub_user;
    GRANT ALL ON SCHEMA public TO dartclub_user;
EOSQL

echo "PostgreSQL initialization completed successfully!"
