# ✅ Setup Complete - Laundry Ordering System

Your laundry ordering system is now configured with PostgreSQL!

## 📁 Project Structure

```
laundry-ordering-system/
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # State management
│   │   ├── pages/        # Customer & Admin pages
│   │   └── App.js
│   └── package.json
│
├── backend/               # Node.js/Express API
│   ├── config/           # Database configuration
│   ├── middleware/       # Authentication middleware
│   ├── models/           # Sequelize models (User, Order)
│   ├── routes/           # API routes
│   ├── scripts/          # Utility scripts
│   └── server.js
│
└── Documentation files
```

## 🚀 Quick Start

### 1. Setup PostgreSQL Database

```bash
# Create database
psql -U postgres
CREATE DATABASE laundry_db;
\q
```

### 2. Configure Backend

```bash
cd backend
npm install
copy .env.example .env
# Edit .env with your PostgreSQL password
```

### 3. Start Backend

```bash
npm run dev
# Server creates tables automatically

# In another terminal, create admin user
npm run create-admin
```

### 4. Start Frontend

```bash
cd frontend
npm install
npm start
```

## 🔑 Default Credentials

**Admin Login:**

- URL: http://localhost:3000/admin/login
- Email: admin@laundry.com
- Password: admin123

**Customer:**

- Register at: http://localhost:3000/register
- Any email/password works (creates new account)

## 📊 Database Schema

### Users Table

- id (Primary Key)
- name
- email (Unique)
- phone
- password (Hashed)
- role (customer/admin)
- createdAt, updatedAt

### Orders Table

- id (Primary Key)
- userId (Foreign Key → users.id)
- userName
- userEmail
- serviceType (enum)
- quantity
- pricePerItem
- totalPrice
- status (Pending/Washing/Completed)
- notes
- createdAt, updatedAt

## 🛠️ Technology Stack

### Frontend

- React 18
- React Router v6
- Context API
- CSS3

### Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcryptjs

## 📝 Available Scripts

### Backend

```bash
npm start          # Production mode
npm run dev        # Development mode with nodemon
npm run create-admin  # Create admin user
```

### Frontend

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

## 🔗 API Endpoints

### Authentication

- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Orders (Protected)

- POST `/api/orders` - Create order
- GET `/api/orders` - Get user's orders
- GET `/api/orders/:id` - Get single order

### Admin (Admin Only)

- GET `/api/admin/orders` - Get all orders
- PUT `/api/admin/orders/:id` - Update order status
- GET `/api/admin/stats` - Get statistics

## 💰 Service Pricing

| Service Type  | Price per Item |
| ------------- | -------------- |
| Normal Wash   | $5             |
| Heavy Wash    | $8             |
| Delicate Wash | $7             |
| Express Wash  | $10            |

## 🔄 Order Workflow

1. **Customer** registers/logs in
2. **Customer** places order (Pending status)
3. **Admin** views order in dashboard
4. **Admin** starts washing (Washing status)
5. **Admin** marks complete (Completed status)
6. **Customer** tracks throughout process

## 🎯 Features Implemented

### Customer Features ✅

- User registration & authentication
- Place orders with service selection
- View order history
- Track order status with visual progress
- Price estimation

### Admin Features ✅

- Admin dashboard with statistics
- View all orders
- Filter by status
- Update order status
- Real-time order management

## 📚 Documentation Files

- `README.md` - Main project documentation
- `QUICKSTART.md` - Quick start guide
- `backend/README.md` - Backend API documentation
- `backend/POSTGRESQL_SETUP.md` - Detailed PostgreSQL setup
- `frontend/README.md` - Frontend documentation

## 🔧 Troubleshooting

### Backend won't start

- Check PostgreSQL is running
- Verify .env credentials
- Ensure database exists

### Frontend can't connect to backend

- Backend must be running on port 5000
- Check CORS is enabled (already configured)
- Update API URLs in Context files if needed

### Admin login fails

- Run `npm run create-admin` in backend
- Use: admin@laundry.com / admin123

## 🚀 Next Steps

### Connect Frontend to Backend

Currently, the frontend uses localStorage (demo mode). To connect to the real backend:

1. Update `frontend/src/context/AuthContext.js`
2. Update `frontend/src/context/OrderContext.js`
3. Replace mock functions with fetch/axios calls to `http://localhost:5000/api/*`

Example:

```javascript
// In AuthContext.js
const login = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  // Handle response...
};
```

### Future Enhancements

- [ ] Connect frontend to backend API
- [ ] Add payment integration
- [ ] Email/SMS notifications
- [ ] Image upload for orders
- [ ] Real-time updates with Socket.io
- [ ] Mobile app (React Native)
- [ ] Pickup & delivery tracking

## 📞 Support

For issues or questions:

1. Check documentation files
2. Review `backend/POSTGRESQL_SETUP.md` for database issues
3. Check console logs for errors

---

**You're all set! Start building amazing features! 🎉**
