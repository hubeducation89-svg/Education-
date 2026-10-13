const fs = require('fs');
const text = fs.readFileSync('dist/assets/index-BC9zb5ek.js', 'utf8');
const idx = text.indexOf('fetch=');
const idx2 = text.indexOf('fetch =');
console.log(idx, idx2);
