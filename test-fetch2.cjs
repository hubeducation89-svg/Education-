const fs = require('fs');
const text = fs.readFileSync('dist/assets/index-BC9zb5ek.js', 'utf8');
console.log(text.indexOf('.fetch='), text.indexOf('.fetch ='));
