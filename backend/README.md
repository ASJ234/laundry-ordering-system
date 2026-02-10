# Laundry Ordering System - Backend API

RESTful API for the Laundry Ordering System built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- Order management
- Admin dashboard
- Role-based access control
- Password hashing with bcrypt

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Update `.env` with your configuration:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/laundry-db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

4. Start MongoDB (if running locally):

```bash
mongod
```

5. Start the server:

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Orders (Protected Routes)

#### Create Order

```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceType": "normal-wash",
  "quantity": 5,
  "notes": "Handle with care"
}
```

#### Get User Orders

```
GET /api/orders
Authorization: Bearer <token>
```

#### Get Single Order

```
GET /api/orders/:id
Authorization: Bearer <token>
```

### Admin Routes (Admin Only)

#### Get All Orders

```
GET /api/admin/orders
Authorization: Bearer <admin_token>
```

#### Update Order Status

```
PUT /api/admin/orders/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Washing"
}
```

#### Get Statistics

```
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

## Service Types & Pricing

- `normal-wash`: $5 per item
- `heavy-wash`: $8 per item
- `delicate-wash`: $7 per item
- `express-wash`: $10 per item

## Order Status Flow

1. **Pending** - Order placed, waiting to be processed
2. **Washing** - Order is being processed
3. **Completed** - Order is complete

## Database Models

### User Model

- name
- email (unique)
- phone
- password (hashed)
- role (customer/admin)
- createdAt

### Order Model

- user (reference to User)
- userName
- userEmail
- serviceType
- quantity
- pricePerItem
- totalPrice
- status
- notes
- createdAt
- updatedAt

## Error Handling

All endpoints return JSON responses with the following structure:

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes require valid token
- Admin routes require admin role
- CORS enabled for frontend integration

## Future Enhancements

- Email notifications
- SMS integration
- Payment gateway integration
- File upload for order images
- Real-time updates with Socket.io
- Rate limiting
- API documentation with Swagger

## License

This project is for educational purposes.
