import { neon } from '@neondatabase/serverless';
import { HeartRateRecord, User } from './definitions';

const sql = neon(process.env.DATABASE_URL!);

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