const http = require('http');
const fs = require('fs');
http.get('http://localhost:3000/@vite/client', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync('vite-client.txt', data));
});
