'use strict'


//基本web客户端
var http = require('http');

var options = {
  host:'192.168.99.85',
  port:'8081',
  path:'/index.htm'
}

var callback = function(response){
  var body = '';
  response.on('data',function(data){
    body += data;
  });
  response.on('error',function(err){
    console.log(err);
  })
  response.on('end',function(){
    console.log(body);
  });
}

var request = http.request(options ,callback);
request.end();
