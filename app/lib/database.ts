import { User } from './definitions';
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default pool;

export async function addUserToDB(firebaseUid: string, email: string) {
    try {
        const query = `
            INSERT INTO users (firebase_uid, email)
            VALUES ($1, $2)
            ON CONFLICT (firebase_uid) DO NOTHING;
        `;
        await pool.query(query, [firebaseUid, email]);
    } catch (error) {
        console.error("Error adding user to DB:", error);
    }
}

export async function getUserFromDB(firebaseUid: string): Promise<User | null> {
    try {
        const query = `
            SELECT * FROM users
            WHERE firebase_uid = $1;
        `;
        const result = await pool.query(query, [firebaseUid]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user from DB:", error);
        return null;
    }
}

export async function deleteUserFromDB(firebaseUid: string) {
    try {
        const query = `
            DELETE FROM users
            WHERE firebase_uid = $1;
        `;
        await pool.query(query, [firebaseUid]);
    } catch (error) {
        console.error("Error deleting user from DB:", error);
    }
}