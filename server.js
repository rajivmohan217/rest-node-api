require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is up and running at Port : ${port}`);
  }
});