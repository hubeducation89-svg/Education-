const fs = require('fs');
const glob = require('glob');
const mapFiles = glob.sync('dist/assets/*.map');
mapFiles.forEach(file => {
  const map = JSON.parse(fs.readFileSync(file, 'utf8'));
  const mods = map.sources.filter(s => s.includes('node_modules'));
  console.log('File:', file);
  mods.forEach(m => console.log('  ', m));
});
