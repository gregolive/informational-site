const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

http.createServer((req, res) => {
  // handle request url
  let filePath = './public' + req.url;
  if (filePath === './public/') {
    filePath = './public/index.html';
  }

  // match file extension to MIME type
  let extname = String(path.extname(filePath)).toLowerCase();
  let mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  };
  let contentType = mimeTypes[extname] || 'application/octet-stream';

  // respond to client
  fs.readFile(filePath, 'utf-8', (err, data) => {
    // handle errors
    if (err) {
      // reply to ENOENT with 404
      if(err.code == 'ENOENT') {
        fs.readFile('./404.html', (err, data) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    } else {
      // if no errors send requested file
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
}).listen(port);
