const http = require("http");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;
const server = http.createServer((req, res) => {
  // if (req.) {
  //   res.statusCode = 200;
  //   res.statusMessage = "OK";
  //   res.setHeader("Content-Type", "text/plain");
  //   res.write(`Hello, `);
  //   res.end("");
  // }
  const url = new URL(req.url, "http://127.0.0.1");
  const searchParam = url.searchParams;

  if (searchParam.has("hello")) {
    if (url.searchParams.get("hello")) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.write(`Hello, ${url.searchParams.get("hello")}!`);
      res.end();
      return;
    }
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
    res.end();
    return;
  }

  if (searchParam.has("users")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end("");
    return;
  }

  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("Hello, World!");
    res.end("");
    return;
  }

  res.statusCode = 500;
  res.setHeader("Content-Type", "text/plain");
  res.write("");
  res.end("");
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
