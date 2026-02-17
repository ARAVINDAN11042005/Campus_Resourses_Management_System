const mysql = require('mysql2/promise');

async function checkNoPassword() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        console.log('SUCCESS: Connection works with NO password.');
        await connection.execute('CREATE DATABASE IF NOT EXISTS campus_management');
        console.log('Database "campus_management" ensured.');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('FAIL: Connection with NO password failed:', error.message);
        process.exit(1);
    }
}

checkNoPassword();
