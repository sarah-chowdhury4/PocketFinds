// Quick test script
import http from 'http';

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/stall/695931a89a30ddae83a2c47e',
    method: 'GET'
};

const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
    });
});

req.on('error', err => console.error('Error:', err.message));
req.end();
