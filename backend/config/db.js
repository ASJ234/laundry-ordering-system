const { Sequelize } = require('sequelize');

console.log('=== Database Configuration ===');
console.log('DB_NAME:', process.env.DB_NAME || 'laundry_db');
console.log('DB_USER:', process.env.DB_USER || 'postgres');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : 'NOT SET');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_PORT:', process.env.DB_PORT || 5432);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'laundry_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

let models = null;

const connectDB = async () => {
  try {
    console.log('Attempting to connect to PostgreSQL...');
    await sequelize.authenticate();
    console.log('PostgreSQL Connected Successfully');
    
    // Initialize models
    const initModels = require('../models');
    models = initModels(sequelize);
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    
    return models;
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    console.error('Full error:', error);
    throw error;
  }
};

const getModels = () => {
  if (!models) {
    throw new Error('Models not initialized. Call connectDB first.');
  }
  return models;
};

module.exports = { sequelize, connectDB, getModels };
