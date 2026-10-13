const fs = require('fs');
const file = 'dist/assets/index-BC9zb5ek.js.map';
const map = JSON.parse(fs.readFileSync(file, 'utf8'));
const mods = [...new Set(map.sources)];
fs.writeFileSync('all-deps.txt', mods.join('\n'));
