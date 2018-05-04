var http = require("http");

http.createServer(function(request, response){
    response.writeHead(302,  {Location: "http://teamtreehouse.com"})
    response.end();
}).listen(3030);
