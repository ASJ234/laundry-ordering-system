require('dotenv').config();

console.log('=== Environment Variables ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', JSON.stringify(process.env.DB_PASSWORD));
console.log('DB_PASSWORD length:', process.env.DB_PASSWORD?.length);
console.log('DB_PASSWORD bytes:', Buffer.from(process.env.DB_PASSWORD || '').toString('hex'));
