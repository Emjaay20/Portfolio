const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Ensure we use the working config
const connectionString = process.env.DATABASE_URL;
console.log('Using connection string:', connectionString.replace(/:[^:@]+@/, ':***@'));

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }, // Critical for IP-based connection
});

async function createTable() {
    try {
        const client = await pool.connect();
        console.log('Connected to database.');

        const query = `
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        path TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

        await client.query(query);
        console.log('✅ analytics_events table created successfully.');

        client.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating table:', err);
        process.exit(1);
    }
}

createTable();
