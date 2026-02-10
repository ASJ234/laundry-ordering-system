const dotenv = require('dotenv');
dotenv.config();
const { sequelize, connectDB } = require('../config/db');


const createAdmin = async () => {
  try {
    const models = await connectDB();
    const { User } = models;
    
    console.log('Database connected');

    // Check if admin exists
    const adminExists = await User.findOne({ 
      where: { email: process.env.ADMIN_EMAIL || 'admin@laundry.com' } 
    });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Administrator',
      email: process.env.ADMIN_EMAIL || 'admin@laundry.com',
      phone: '0000000000',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
