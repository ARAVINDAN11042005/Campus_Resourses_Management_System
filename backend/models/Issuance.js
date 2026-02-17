const { getPool } = require('../config/db');

class Issuance {
    static async getAll() {
        const db = await getPool();
        const [rows] = await db.query(`
            SELECT i.*, r.name as resource_name, s.name as student_name 
            FROM issuances i
            JOIN resources r ON i.resource_id = r.id
            JOIN students s ON i.student_id = s.id
            ORDER BY i.issue_date DESC
        `);
        return rows;
    }

    static async issueResource(student_id, resource_id) {
        const db = await getPool();
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Check availability
            const [resources] = await connection.query('SELECT available_quantity FROM resources WHERE id = ? FOR UPDATE', [resource_id]);
            if (resources.length === 0) throw new Error('Resource not found');
            if (resources[0].available_quantity <= 0) throw new Error('Resource not available');

            // Insert issuance
            await connection.query(
                'INSERT INTO issuances (student_id, resource_id, status) VALUES (?, ?, "ISSUED")',
                [student_id, resource_id]
            );

            // Update availability
            await connection.query(
                'UPDATE resources SET available_quantity = available_quantity - 1 WHERE id = ?',
                [resource_id]
            );

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async returnResource(issuance_id) {
        const db = await getPool();
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Get issuance details
            const [issuances] = await connection.query('SELECT resource_id, status FROM issuances WHERE id = ? FOR UPDATE', [issuance_id]);
            if (issuances.length === 0) throw new Error('Issuance record not found');
            if (issuances[0].status === 'RETURNED') throw new Error('Resource already returned');

            const resource_id = issuances[0].resource_id;

            // Update issuance status
            await connection.query(
                'UPDATE issuances SET status = "RETURNED", return_date = CURRENT_TIMESTAMP WHERE id = ?',
                [issuance_id]
            );

            // Update availability
            await connection.query(
                'UPDATE resources SET available_quantity = available_quantity + 1 WHERE id = ?',
                [resource_id]
            );

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = Issuance;
