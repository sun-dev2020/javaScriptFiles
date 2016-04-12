'use strict'

//基本的web服务器

var
http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer(function (request,response) {
  var pathname = url.parse(request.url).pathname;
  console.log('request for '+ pathname + ' received');
  fs.readFile(__dirname + pathname,function(err,data){
    if (err) {
      console.log(err);
      response.writeHead(404,{'Content-type':'text/plain'});
    }else {
      response.writeHead(200,{'Content-type':'text/plain'});
      response.write(data.toString());
    }
    response.end();
  });
}).listen(8081);
console.log('server running at http://192.168.99.85:8081/');
