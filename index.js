const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// serve static files
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// route all other requests to 404 page
app.use((req, res,) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function() {
  console.log('server listening on port ' + port)
});
