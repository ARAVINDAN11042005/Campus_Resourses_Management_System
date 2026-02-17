require('dotenv').config();
console.log('ENV CHECK:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'SET (' + process.env.DB_PASSWORD.length + ' chars)' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);
