const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');
const url = require('url');

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
}

console.log('Full URL (masked):', dbUrl.replace(/:[^:@]+@/, ':***@'));

try {
    const parsed = new URL(dbUrl);
    console.log('Hostname:', parsed.hostname);
    console.log('Port:', parsed.port);

    console.log('Attempting DNS lookup for:', parsed.hostname);
    dns.lookup(parsed.hostname, (err, address, family) => {
        if (err) {
            console.error('DNS Lookup failed:', err.message);
            console.error('Code:', err.code);
        } else {
            console.log('DNS Lookup success:', address, 'Family:', family);
            // Proceed to test connection only if DNS works
            testPoolConnection();
        }
    });

} catch (e) {
    console.error('Invalid URL:', e.message);
}

async function testPoolConnection() {
    console.log('Attempting PG Connection...');
    const pool = new Pool({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false } // Try relaxed SSL first to rule out cert issues masking as connection errors
    });

    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database!');
        const res = await client.query('SELECT NOW()');
        console.log('Current time from DB:', res.rows[0].now);
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('PG Connection error:', err.message);
        console.error('Code:', err.code);
        process.exit(1);
    }
}
