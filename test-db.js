const dns = require('dns');
const net = require('net');

const hostname = 'ep-muddy-pine-ahwu2qfx.us-east-1.aws.neon.tech';
const port = 5432;

console.log(`Testing connectivity to ${hostname}:${port}...`);

// 1. Test DNS
dns.lookup(hostname, (err, address, family) => {
    if (err) {
        console.error('❌ DNS Lookup failed:', err.message);
        return;
    }
    console.log(`✅ DNS Lookup successful: ${hostname} -> ${address} (IPv${family})`);

    // 2. Test TCP
    const socket = new net.Socket();
    socket.setTimeout(5000); // 5s timeout

    socket.connect(port, address, () => {
        console.log('✅ TCP Connection successful!');
        socket.end();
    });

    socket.on('error', (err) => {
        console.error('❌ TCP Connection failed:', err.message);
    });

    socket.on('timeout', () => {
        console.error('❌ TCP Connection timed out');
        socket.destroy();
    });
});
