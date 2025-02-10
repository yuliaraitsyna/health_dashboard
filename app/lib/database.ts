import { User } from './definitions';
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default pool;

export async function addUserToDB(email: string) {
    try {
        const query = `
            INSERT INTO users (email)
            VALUES ($1)
        `;
        await pool.query(query, [email]);
    } catch (error) {
        console.error("Error adding user to DB:", error);
    }
}

export async function getUserFromDB(email: string): Promise<User | null> {
    try {
        const query = `
            SELECT * FROM users
            WHERE email = $1;
        `;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user from DB:", error);
        return null;
    }
}

export async function deleteUserFromDB(id: number) {
    try {
        const query = `
            DELETE FROM users
            WHERE id = $1;
        `;
        await pool.query(query, [id]);
    } catch (error) {
        console.error("Error deleting user from DB:", error);
    }
}

export async function getUserHeartData(id: number) {
    try {
        const query = `
            SELECT hd.id, hd.hr, hd.date
            FROM heart_data hd
            JOIN users u ON hd.user_id = u.id
            WHERE hd.user_id = $1;
        `;

        const result = await pool.query(query, [id]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching heart data:", error);
        throw new Error("Database query failed");
    }
}
