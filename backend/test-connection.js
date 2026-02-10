const { Sequelize } = require('sequelize');
require('dotenv').config();

const testConnection = async () => {
  console.log('Testing PostgreSQL connection...\n');
  console.log('Configuration:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`User: ${process.env.DB_USER}`);
  console.log(`Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : 'NOT SET'}\n`);

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: console.log
    }
  );

  try {
    await sequelize.authenticate();
    console.log('\n✅ Connection successful!');
    console.log('PostgreSQL is working correctly.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\nPossible solutions:');
    console.error('1. Verify password is correct: psql -U postgres');
    console.error('2. Check if PostgreSQL is running');
    console.error('3. Reset password: ALTER USER postgres WITH PASSWORD \'your_password\';');
    console.error('4. Check pg_hba.conf authentication method');
    process.exit(1);
  }
};

testConnection();
