const http = require('http');

http
  .createServer((req, res) => {
    res.statusCode = 201;
    res.end();
  })
  .listen(8080);
