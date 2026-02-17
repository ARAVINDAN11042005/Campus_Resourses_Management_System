const { getPool } = require('../config/db');

class Student {
    static async getAll() {
        const db = await getPool();
        const [rows] = await db.query('SELECT * FROM students');
        return rows;
    }

    static async getById(id) {
        const db = await getPool();
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const db = await getPool();
        const { student_code, name, email, department } = data;
        const [result] = await db.query(
            'INSERT INTO students (student_code, name, email, department) VALUES (?, ?, ?, ?)',
            [student_code, name, email, department]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const db = await getPool();
        const { student_code, name, email, department } = data;
        await db.query(
            'UPDATE students SET student_code = ?, name = ?, email = ?, department = ? WHERE id = ?',
            [student_code, name, email, department, id]
        );
    }

    static async delete(id) {
        const db = await getPool();
        await db.query('DELETE FROM students WHERE id = ?', [id]);
    }
}

module.exports = Student;
