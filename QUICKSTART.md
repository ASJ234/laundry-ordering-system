# Quick Start Guide

Get the Laundry Ordering System up and running in minutes!

## Option 1: Frontend Only (Demo Mode)

If you just want to see the UI with mock data:

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

**Demo Credentials:**

- Customer: Any email/password (auto-creates account)
- Admin: admin@laundry.com / admin123

## PostgreSQL Setup

### If you don't have PostgreSQL installed:

1. **Download & Install**
   - Visit https://www.postgresql.org/download/windows/
   - Install PostgreSQL (remember the password you set!)

2. **Create Database**

```bash
psql -U postgres
CREATE DATABASE laundry_db;
\q
```

3. **Configure Backend**

```bash
cd backend
copy .env.example .env
# Edit .env and set DB_PASSWORD to your PostgreSQL password
```

For detailed setup instructions, see `backend/POSTGRESQL_SETUP.md`

## Option 2: Full Stack (Frontend + Backend)

### Step 1: Start Backend

```bash
# Terminal 1
cd backend
npm install

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE laundry_db;
\q

# Create .env file
copy .env.example .env
# Edit .env with your PostgreSQL password

# Start server (creates tables automatically)
npm run dev

# In another terminal, create admin user
npm run create-admin
```

Backend runs on `http://localhost:5000`

### Step 2: Start Frontend

```bash
# Terminal 2
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Step 3: Connect Frontend to Backend

Update `frontend/src/context/AuthContext.js` and `frontend/src/context/OrderContext.js` to use API endpoints instead of localStorage.

Example:

```javascript
// Replace mock login with:
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await response.json();
```

## MongoDB Setup

### Local MongoDB

```bash
# Install MongoDB, then:
mongod
```

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

## Testing the Application

### As Customer:

1. Register at `/register`
2. Place order at `/place-order`
3. View orders at `/order-history`
4. Track status at `/order-status/:id`

### As Admin:

1. Login at `/admin/login` (admin@laundry.com / admin123)
2. View dashboard at `/admin/dashboard`
3. Manage orders at `/admin/orders`

## Troubleshooting

**Port already in use:**

```bash
# Change PORT in backend/.env
PORT=5001
```

**MongoDB connection error:**

- Check if MongoDB is running
- Verify MONGODB_URI in .env

**CORS errors:**

- Backend already has CORS enabled
- Check if backend is running

## Next Steps

- Customize pricing in `backend/routes/orders.js`
- Add email notifications
- Integrate payment gateway
- Deploy to production

Enjoy building! 🚀
