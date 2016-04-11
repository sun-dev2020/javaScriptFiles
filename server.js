'use strict'

console.log('server');


var s = 'hello';
function greet(name){
  console.log(s+','+name);
}

module.exports = greet;


var
fs = require('fs'),
url = require('url'),
path = require('path'),
http = require('http');

//获取root目录
var root = path.resolve(process.argv[2] || '.');
console.log('static root dir: '+root);

var server = http.createServer(function(request ,response){
  console.log(request.method+':'+request.url);
  // response.writeHead(200,{'Content-type':'text/html'});
  var pathname = url.parse(request.url).pathname;
  var filepath = path.join(root,pathname);
  console.log('pathname : '+ pathname + '=='+ filepath);
  fs.stat(filepath, function(error,stats){
    if (!error && stats.isFile()) {
      console.log('200'+ request.url);
      response.writeHead(200);
      fs.createReadStream(filepath).pipe(response);
    }else {
      console.log('404'+ request.url);
      response.writeHead(404);
      response.end('404 not found');
    }
  })

  response.end('<h1>Hello</h1>');
});
server.listen(8081);


//事件响应,fs,net,http等核心模块都继承eventEmitter
var events = require('events');
var eventEmitter = new events.EventEmitter();      //events模块只有EventEmitter类
var fnc = function eventHandler(){   //绑定事件和处理方法
  console.log('event response');
}
eventEmitter.on('eventName', fnc);
eventEmitter.addListener('connection',function(){
  console.log('connection');
});
eventEmitter.emit('eventName');   //触发事件
eventEmitter.emit('connection');

eventEmitter.removeListener('eventName', fnc);


//缓存二进制数据流  Buffer库
var buf = new Buffer(10);      //创建长度是10字节的buffer
var buff = new Buffer([1,2,3]);
var buffer = new Buffer('www.baidu.com','utf-8');

// buf.write(string,offset,length,encoding);
var len = buf.write('www.baidu.com');
console.log('write length:'+ len);

// buf.toString(encoding,start,end);
var str = buf.toString('utf-8',0,10);

//转成JSON
var json = buffer.toJSON(buffer);
console.log('buffer json :'+ json);

//buffer合并
var newbuf = Buffer.concat([buffer,buff]);
console.log('concat :'+ newbuf);

//copy
var buf1 = new Buffer(3);
var buf2 = new Buffer('six');
buf2.copy(buf1);        //将buf2 copy到buf1

//slice  裁剪
buf2.slice(0 ,2);     //si

console.log('path:'+ __dirname);
//__filename 是当前文件路径  __dirname是当前文件所在文件夹路径

var readerStream = fs.createReadStream(__dirname +'/input.txt');
var data = '';
readerStream.on('data',function(chunk){
  data += chunk;
  console.log('data = '+ data);
});
readerStream.on('end',function(){
  console.log('read finish : '+ data);
  var writeStream = fs.createWriteStream(__dirname +'/output.txt');
  writeStream.write(data,'utf-8');
  writeStream.end();
  writeStream.on('finish',function(){
    console.log('write finish');
  });
  writeStream.on('error',function(){
    console.log('write error :'+ error);
  });
});


// readerStream.pipe(writeStream);
console.log('读写完毕');
