const { getPool } = require('../config/db');

class Resource {
    static async getAll() {
        const db = await getPool();
        const [rows] = await db.query('SELECT * FROM resources');
        return rows;
    }

    static async getById(id) {
        const db = await getPool();
        const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const db = await getPool();
        const { name, type, total_quantity } = data;
        const [result] = await db.query(
            'INSERT INTO resources (name, type, total_quantity, available_quantity) VALUES (?, ?, ?, ?)',
            [name, type, total_quantity, total_quantity]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const db = await getPool();
        const { name, type, total_quantity, available_quantity } = data;
        await db.query(
            'UPDATE resources SET name = ?, type = ?, total_quantity = ?, available_quantity = ? WHERE id = ?',
            [name, type, total_quantity, available_quantity, id]
        );
    }

    static async delete(id) {
        const db = await getPool();
        await db.query('DELETE FROM resources WHERE id = ?', [id]);
    }
}

module.exports = Resource;
