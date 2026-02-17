const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Successfully connected to the database.');
        const [rows] = await connection.execute('SHOW TABLES');
        console.log('Tables in database:', rows.map(r => Object.values(r)[0]));
        await connection.end();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('The database "campus_management" does not exist. Please run schema.sql.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('Access denied. Check your DB_USER and DB_PASSWORD in .env.');
        }
    }
}

testConnection();
