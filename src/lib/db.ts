import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

console.log('DB Connection String:', process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@') : 'undefined');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);
