# Laundry Washing Machine Ordering System

A web-based application built with React that allows customers to place orders for washing their clothes using the service provider's washing machine.

## Features

### Customer Features

- User registration and login
- Place laundry orders with different service types
- Select quantity and add special instructions
- View order history
- Track order status in real-time
- Price estimation

### Admin Features

- Admin dashboard with statistics
- View all orders
- Filter orders by status (Pending, Washing, Completed)
- Update order status
- Manage customer orders

## Service Types & Pricing

- **Normal Wash**: $5 per item - Standard washing for everyday clothes
- **Heavy Wash**: $8 per item - Deep cleaning for heavily soiled items
- **Delicate Wash**: $7 per item - Gentle care for delicate fabrics
- **Express Wash**: $10 per item - Quick turnaround service

## Technology Stack

- **Frontend**: React.js
- **Routing**: React Router
- **State Management**: Context API
- **Styling**: CSS3
- **Storage**: LocalStorage (for demo purposes)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser and navigate to:

```
http://localhost:3000
```

## Usage

### For Customers

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Place Order**:
   - Navigate to "Place Order"
   - Select service type
   - Enter quantity
   - Add optional notes
   - Submit order
4. **Track Orders**: View order history and status at "My Orders"

### For Admin

1. **Login**: Navigate to `/admin/login`
   - Email: `admin@laundry.com`
   - Password: `admin123`
2. **Dashboard**: View statistics and recent orders
3. **Manage Orders**:
   - Filter orders by status
   - Update order status (Pending → Washing → Completed)
   - View customer details

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   └── AdminRoute.js
├── context/
│   ├── AuthContext.js
│   └── OrderContext.js
├── pages/
│   ├── customer/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── PlaceOrder.js
│   │   ├── OrderHistory.js
│   │   └── OrderStatus.js
│   └── admin/
│       ├── AdminLogin.js
│       ├── AdminDashboard.js
│       └── OrdersManagement.js
├── App.js
└── index.js
```

## Order Workflow

1. Customer registers or logs in
2. Customer fills in laundry order details
3. Order is submitted with "Pending" status
4. Admin views the order in dashboard
5. Admin updates status to "Washing"
6. Admin marks order as "Completed"
7. Customer can track order throughout the process

## Future Enhancements

- Online payment integration (Mobile Money, Credit Cards)
- Real-time notifications
- SMS and email alerts
- Mobile app version (React Native)
- Pickup and delivery services
- Automated washing schedules
- Backend API integration
- Database persistence

## Notes

- This is a demo application using LocalStorage for data persistence
- In production, replace mock authentication with real API calls
- Connect to a backend server for proper data management
- Implement proper security measures (JWT, password hashing, etc.)

## License

This project is for educational purposes.
