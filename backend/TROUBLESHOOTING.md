# PostgreSQL Authentication Troubleshooting

## Error: "password authentication failed for user 'postgres'"

This error means PostgreSQL is rejecting your password. Here are solutions:

---

## Solution 1: Verify Your Password

Test if your password works:

```bash
psql -U postgres -h localhost
```

Enter your password when prompted. If it fails, the password is wrong.

---

## Solution 2: Reset PostgreSQL Password

### Method A: Using psql (if you can connect)

```bash
# Try connecting without password
psql -U postgres

# If successful, reset password
ALTER USER postgres WITH PASSWORD 'feyti';
\q
```

### Method B: Using pgAdmin

1. Open pgAdmin
2. Right-click on "PostgreSQL" server
3. Properties → Connection
4. Update password
5. Save

---

## Solution 3: Check pg_hba.conf File

The `pg_hba.conf` file controls authentication methods.

### Find pg_hba.conf location:

```bash
psql -U postgres -c "SHOW hba_file;"
```

Or typically located at:

- Windows: `C:\Program Files\PostgreSQL\15\data\pg_hba.conf`
- Or: `C:\Program Files\PostgreSQL\<version>\data\pg_hba.conf`

### Edit pg_hba.conf:

1. Open as Administrator
2. Find lines like:

   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            scram-sha-256
   ```

3. Change `scram-sha-256` to `trust` (temporarily):

   ```
   host    all             all             127.0.0.1/32            trust
   ```

4. Save file

5. Restart PostgreSQL:
   - Windows: Services → postgresql-x64-15 → Restart
   - Or: `net stop postgresql-x64-15 && net start postgresql-x64-15`

6. Now you can connect without password and reset it:

   ```bash
   psql -U postgres
   ALTER USER postgres WITH PASSWORD 'feyti';
   \q
   ```

7. Change `trust` back to `scram-sha-256` in pg_hba.conf

8. Restart PostgreSQL again

---

## Solution 4: Create New PostgreSQL User

Instead of using 'postgres', create a new user:

```bash
# Connect as postgres
psql -U postgres

# Create new user
CREATE USER laundry_user WITH PASSWORD 'your_password';

# Grant privileges
ALTER USER laundry_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE laundry_db TO laundry_user;

\q
```

Then update `.env`:

```env
DB_USER=laundry_user
DB_PASSWORD=your_password
```

---

## Solution 5: Check PostgreSQL Service

Make sure PostgreSQL is running:

### Windows:

1. Press `Win + R`
2. Type `services.msc`
3. Find `postgresql-x64-15` (or your version)
4. Status should be "Running"
5. If not, right-click → Start

### Command Line:

```bash
# Check status
sc query postgresql-x64-15

# Start service
net start postgresql-x64-15
```

---

## Solution 6: Use Connection String

Try using a connection string instead:

Update `backend/config/db.js`:

```javascript
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "postgres",
    logging: false,
  },
);
```

---

## Test Your Connection

Run the test script:

```bash
cd backend
node test-connection.js
```

This will show exactly what's wrong.

---

## Common Issues

### Issue: Password has special characters

If your password contains special characters like `@`, `#`, `$`, etc., you might need to:

1. Change password to something simple (letters and numbers only)
2. Or URL-encode the password in connection string

### Issue: Wrong PostgreSQL version

Check your PostgreSQL version:

```bash
psql --version
```

Service name might be different:

- `postgresql-x64-14` for version 14
- `postgresql-x64-15` for version 15
- `postgresql-x64-16` for version 16

### Issue: PostgreSQL not in PATH

Add PostgreSQL to PATH:

1. Find bin folder: `C:\Program Files\PostgreSQL\15\bin`
2. Add to System Environment Variables
3. Restart terminal

---

## Quick Fix (Development Only)

For development, you can temporarily use trust authentication:

1. Edit `pg_hba.conf`
2. Change to `trust` for local connections
3. Restart PostgreSQL
4. No password needed

**⚠️ WARNING: Never use 'trust' in production!**

---

## Still Not Working?

1. Check PostgreSQL logs:
   - Windows: `C:\Program Files\PostgreSQL\15\data\log\`

2. Reinstall PostgreSQL:
   - Uninstall completely
   - Reinstall and remember the password you set

3. Use Docker PostgreSQL:
   ```bash
   docker run --name postgres -e POSTGRES_PASSWORD=feyti -p 5432:5432 -d postgres
   ```

---

## Need More Help?

Run these commands and share the output:

```bash
# Check PostgreSQL version
psql --version

# Check if PostgreSQL is running
sc query postgresql-x64-15

# Test connection
node test-connection.js

# Check pg_hba.conf location
psql -U postgres -c "SHOW hba_file;"
```
