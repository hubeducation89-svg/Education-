import http from 'http';
http.get('http://localhost:3000/src/main.tsx', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('main:', data.substring(0, 500)));
});
