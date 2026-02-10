# Laundry Washing Machine Ordering System

A full-stack web application for managing laundry orders. Customers can place orders for washing services, track their status, while administrators can manage all orders through a dedicated dashboard.

## Project Structure

```
laundry-ordering-system/
├── frontend/          # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/           # Node.js/Express API
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── server.js
```

## Features

### Customer Features

- User registration and authentication
- Place laundry orders with multiple service types
- Real-time order tracking
- Order history
- Price estimation

### Admin Features

- Admin dashboard with statistics
- View and manage all orders
- Update order status
- Filter orders by status

### Service Types

- **Normal Wash**: $5/item - Standard washing
- **Heavy Wash**: $8/item - Deep cleaning
- **Delicate Wash**: $7/item - Gentle care
- **Express Wash**: $10/item - Quick service

## Tech Stack

### Frontend

- React.js
- React Router
- Context API
- CSS3

### Backend

- Node.js
- Express.js
- Postgress
- JWT Authentication
- bcryptjs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Postgress
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd laundry-ordering-system
```

2. **Setup Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**

```bash
cd frontend
npm install
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=laundry_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders (Protected)

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Admin (Admin Only)

- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/stats` - Get statistics

## Default Admin Credentials

```
Email: admin@laundry.com
Password: admin123
```

## Order Workflow

1. Customer registers/logs in
2. Places order with service type and quantity
3. Order created with "Pending" status
4. Admin views order in dashboard
5. Admin updates to "Washing"
6. Admin marks as "Completed"
7. Customer tracks throughout process

## Development

### Frontend Development

```bash
cd frontend
npm start
```

Runs on `http://localhost:3000`

### Backend Development

```bash
cd backend
npm run dev
```

Runs on `http://localhost:5000`

## Future Enhancements

- [ ] Payment integration
- [ ] Email/SMS notifications
- [ ] Mobile app (React Native)
- [ ] Pickup and delivery tracking
- [ ] Real-time updates with Socket.io
- [ ] Image upload for orders
- [ ] Rating and review system

## License

This project is for educational purposes.
