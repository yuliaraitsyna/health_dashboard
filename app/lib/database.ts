import { neon } from '@neondatabase/serverless';
import { HeartRateRecord, User } from './definitions';
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default pool;


const sql = neon(process.env.DATABASE_URL!);

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

export async function fetchUsers(): Promise<User[]> {
    try {
        const users = await sql`SELECT * FROM users`;
        return users.map(user => ({
            id: user.id,
            username: user.username
        }));
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function fetchUserHeartRateRecords(userId: number): Promise<HeartRateRecord[]> {
    try {
        const records = await sql`
            SELECT heart_data.*, users.*
            FROM heart_data
            JOIN users ON users.id = heart_data.user_id
            WHERE heart_data.user_id = ${userId}
        `;

        return records.map(record => ({
            id: record.id,
            heartRate: record.heart_rate,
            date: new Date(record.date),
            user: {
                id: record.user_id,
                username: record.username
            }
        }));
    }
    catch (err) {
        console.error(err);
        return [];
    }
}