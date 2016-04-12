'use strict'

console.log('server');


var s = 'hello';
function greet(name){
  console.log(s+','+name);
};

module.exports = greet;


var
fs = require('fs'),
url = require('url'),
path = require('path'),
http = require('http'),
util = require('util');
querystring = require('querystring');
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


//压缩和解压

var zlib = require('zlib');
fs.createReadStream(__dirname+ '/input.txt')
.pipe(zlib.createGzip()).pipe(fs.createWriteStream(__dirname+'/output.txt.gz'));
console.log('压缩完成');

//解压
// fs.createReadStream(__dirname+'/output.txt.gz').pipe(zlib.createGunzip())
// .pipe(fs.createWriteStream(__dirname +'/input.txt'))

function route(pathname){
  console.log('about to route a request for '+ pathname);
}

function start(route){
  function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log('URL'+ request.url);
    console.log('request for'+ pathname + 'received');
    route(pathname);
    response.writeHead(200,{'Content-type': 'text/plain'});
    response.write('hello world');
    response.end(util.inspect(url.parse(request.url,true)));
  }
  http.createServer(onRequest).listen(8888);
  console.log('server has started');
}
start(route);



//常用工具模块util
//inherits 函数用于继承
function Base(){
  this.name = 'base';
  this.base = 1992 ;
  this.sayHello = function(){
    console.log('hello'+ this.name);
  }
}

Base.prototype.showName = function(){
  console.log(this.name);
}
function Sub(){
  this.name = 'sub';
}

util.inherits(Sub,Base);    //Sub仅仅继承Base在原型中定义的函数showName，不会继承内部函数定义的变量和函数sayhello

var subobj = new Sub();
// subobj.sayHello();
subobj.showName();

//util.inspect()     将任意对象转成字符串
function Person(){
  this.name = 'person';
  this.toString = function(){
    return this.name;
  };
}
var obj = new Person();
console.log('inspect '+ util.inspect(obj,true));

//util.isArray(obj)     判读是否是数组
util.isArray([2,1,3]);
util.isRegExp(new RegExp('regexp'));      //true
util.isDate(new Date());
util.isError(new Error());

//文件读取fs
var fpath = __dirname+'/input.txt';
fs.readFile(fpath,function(err,data){
  if (err) {
    return console.log(err);
  }
  console.log('异步读取' + data.toString());
})

stats.isDirectory(fpath)
fs.stats(fpath,function(err,stats){

});
//打开文件
fs.open(fpath,'r+',function(err,fd){

})
//写入文件
// fs.writeFile(fpath,data,options,callback),data可以是字符串或者buffer流

//截取文件   fs.ftruncate(fd,len,callback); fd是通过open拿到的fd文件描述符

//创建目录   fs.mkdir(path,mode,callback);  mode指目录权限默认是0777

fs.mkdir(__dirname + '/tem/test',function(err){
  if (err) {
    return console.error(err);
  }
  console.log('目录创建成功');
});

// fs.rmdir()   删除目录

//接收POST请求
http.createServer(req,response){
  var post = '';
  req.on('data',function(chunk){
    post += chunk;
  });
  req.on('end',function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    post = querystring.parse(post);
    response.end(util.inspect(post));
  })
}.listen(3000);
