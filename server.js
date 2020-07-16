var destPATH = "./dist/";

var StaticServer = require("static-server");
var server = new StaticServer({
  rootPath: destPATH,
  port: 8000,
});

server.start(function () {
  console.log("server is a running ", server.port);
});
