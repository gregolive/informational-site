const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;
let page;

fs.readFile('./src/index.html', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  page = data;
});

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(page);
}).listen(port);
