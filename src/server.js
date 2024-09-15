const http = require("http");
const app = require("./app.js");

require("./config/connect.js");

const server = http.createServer(app);


const port = process.env.PORT || 8000;

async function startServer() {
  server.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();
