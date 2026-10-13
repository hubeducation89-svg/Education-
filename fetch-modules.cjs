const http = require('http');
const fs = require('fs');

function fetchAndSave(url, filename) {
  http.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync(filename, data));
  });
}

fetchAndSave('http://localhost:3000/src/main.tsx', 'main.txt');
fetchAndSave('http://localhost:3000/src/App.tsx', 'app.txt');
