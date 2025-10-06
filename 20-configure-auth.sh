#!/bin/bash
set -e

# Configure pg_hba.conf for SCRAM-SHA-256 authentication
cat > /var/lib/postgresql/data/pgdata/pg_hba.conf <<EOF
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     scram-sha-256
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
host    all             all             0.0.0.0/0               scram-sha-256
local   replication     all                                     scram-sha-256
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
EOF

echo "pg_hba.conf configured for SCRAM-SHA-256 authentication"
