import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getUsers() {
    try {
        const users = await sql`SELECT * FROM users`;
        return users;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}