const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    try {
        // First, connect without a database to create it
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`Database "${DB_NAME}" ensured.`);
        await connection.end();

        const promisePool = mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Create tables
        await promisePool.query(`
            CREATE TABLE IF NOT EXISTS resources (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                total_quantity INT NOT NULL DEFAULT 0,
                available_quantity INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await promisePool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_code VARCHAR(50) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                department VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await promisePool.query(`
            CREATE TABLE IF NOT EXISTS issuances (
                id INT AUTO_INCREMENT PRIMARY KEY,
                resource_id INT NOT NULL,
                student_id INT NOT NULL,
                issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                return_date TIMESTAMP NULL,
                status ENUM('ISSUED', 'RETURNED') DEFAULT 'ISSUED',
                FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
            );
        `);

        console.log('Tables ensured successfully.');
        return promisePool;
    } catch (error) {
        console.error('DATABASE INITIALIZATION ERROR:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Check your DB_USER and DB_PASSWORD in .env');
        }
        throw error;
    }
}

// Export a function that returns the pool, or the pool itself if we can top-level await
// Since this is CommonJS and we want to ensure it's initialized, we'll use a slightly different pattern
let pool;

async function getPool() {
    if (!pool) {
        pool = await initializeDatabase();
    }
    return pool;
}

module.exports = { getPool };
