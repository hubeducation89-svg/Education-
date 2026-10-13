const { spawn } = require('child_process');
const server = spawn('npx', ['tsx', 'server.ts']);
server.stdout.on('data', data => console.log('STDOUT:', data.toString()));
server.stderr.on('data', data => console.log('STDERR:', data.toString()));
setTimeout(() => server.kill(), 5000);
