# PostgreSQL Setup Guide

## Installation on Windows

### Step 1: Download PostgreSQL

1. Visit https://www.postgresql.org/download/windows/
2. Download the installer (recommended: latest stable version)
3. Run the installer

### Step 2: Installation Process

1. Click "Next" through the setup wizard
2. Choose installation directory (default is fine)
3. Select components (keep all defaults)
4. Choose data directory (default is fine)
5. **Set a password for the postgres user** (remember this!)
6. Keep default port: 5432
7. Keep default locale
8. Complete installation

### Step 3: Verify Installation

Open Command Prompt or PowerShell:

```bash
psql --version
```

You should see something like: `psql (PostgreSQL) 15.x`

## Create Database

### Option 1: Using psql Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Enter your password when prompted

# Create database
CREATE DATABASE laundry_db;

# Verify database was created
\l

# Exit
\q
```

### Option 2: Using pgAdmin (GUI)

1. Open pgAdmin (installed with PostgreSQL)
2. Connect to PostgreSQL server (enter your password)
3. Right-click "Databases" → "Create" → "Database"
4. Name: `laundry_db`
5. Click "Save"

## Configure Backend

### Step 1: Create .env file

In the `backend` folder, copy `.env.example` to `.env`:

```bash
cd backend
copy .env.example .env
```

### Step 2: Update .env with your credentials

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=laundry_db
DB_USER=postgres
DB_PASSWORD=your_password_here  # Replace with your PostgreSQL password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Admin Credentials
ADMIN_EMAIL=admin@laundry.com
ADMIN_PASSWORD=admin123
```

## Start the Application

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Start Server

The server will automatically create all necessary tables:

```bash
npm run dev
```

You should see:

```
PostgreSQL Connected Successfully
Database synchronized
Server running on port 5000
```

### Step 3: Create Admin User

In a new terminal:

```bash
cd backend
npm run create-admin
```

You should see:

```
Database connected
Admin user created successfully
Email: admin@laundry.com
Password: admin123
```

## Verify Setup

### Check Tables

```bash
psql -U postgres -d laundry_db

# List tables
\dt

# You should see:
# - users
# - orders

# View users table structure
\d users

# Exit
\q
```

## Troubleshooting

### Error: "psql: command not found"

Add PostgreSQL to your PATH:

1. Find PostgreSQL bin folder (usually `C:\Program Files\PostgreSQL\15\bin`)
2. Add to System Environment Variables → Path
3. Restart terminal

### Error: "password authentication failed"

- Double-check password in `.env` file
- Make sure you're using the password you set during installation

### Error: "database does not exist"

Create the database:

```bash
psql -U postgres
CREATE DATABASE laundry_db;
\q
```

### Error: "port 5432 is already in use"

Another PostgreSQL instance is running. Either:

- Stop the other instance
- Change `DB_PORT` in `.env` to a different port

### Connection Timeout

- Check if PostgreSQL service is running:
  - Windows: Services → postgresql-x64-15 (should be "Running")
- Restart PostgreSQL service if needed

## Database Management

### View All Data

```bash
psql -U postgres -d laundry_db

# View all users
SELECT * FROM users;

# View all orders
SELECT * FROM orders;

# Exit
\q
```

### Reset Database

```bash
psql -U postgres

# Drop and recreate database
DROP DATABASE laundry_db;
CREATE DATABASE laundry_db;

\q

# Restart server to recreate tables
cd backend
npm run dev

# Recreate admin
npm run create-admin
```

## Production Considerations

For production deployment:

1. **Use strong passwords**
   - Change `DB_PASSWORD`
   - Change `JWT_SECRET`
   - Change `ADMIN_PASSWORD`

2. **Use environment-specific settings**
   - Different database for production
   - Enable SSL for database connections
   - Set `NODE_ENV=production`

3. **Backup your database**

   ```bash
   pg_dump -U postgres laundry_db > backup.sql
   ```

4. **Restore from backup**
   ```bash
   psql -U postgres laundry_db < backup.sql
   ```

## Next Steps

Once PostgreSQL is set up:

1. Start the backend: `npm run dev`
2. Start the frontend: `cd frontend && npm start`
3. Visit http://localhost:3000
4. Login as admin: admin@laundry.com / admin123

Happy coding! 🚀
