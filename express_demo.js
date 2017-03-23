'use strict'

//Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
// http://www.runoob.com/nodejs/nodejs-express-framework.html

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});

// 接收get请求
app.get('/postIndex.htm', function(req ,response){
  // response.send('hello get');
  response.sendFile(__dirname + '/postIndex.htm');
})

//接收post请求，并输出
app.post('/process_post',urlencodedParser ,function(req,res){
   var response = {first_name: req.body.first_name,
   last_name: req.body.last_name};
   console.log(response);
   res.end(JSON.stringify(response));
})

//上传图片
var multer = require('multer');
var fs = require('fs');

app.use(multer({dest:'/tmp/'}).array('image'));
app.get('/uploadIndex.htm',function(req,res){
  res.sendFile(__dirname+'/uploadIndex.htm');
})
app.post('/file_upload',function(req,res){
  console.log(req.files[0]);
  var des_file = __dirname+'/'+req.files[0].originalname;
   fs.readFile(req.files[0].path,function(err,data){
     fs.writeFile(des_file,data,function(err){
     if (err) {
       console.log(err);
     }else {
       var response = {
         message:'file uploaded successfully',
         filename:req.files[0].originalname
       };
       console.log(response);
       res.end(JSON.stringify(response));
     }
   })
   })
})


var server = app.listen(8081,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('应用实例，访问地址是: http://%s:%s',host,port);
})

app.post('/',function(req,res){
  console.log('post request');
  res.send('hello post');
})

app.delete('/del_user',function(req,res){
  console.log('/list_user get request');
  res.send('user list');
})

app.get('/ab*cd',function(req,res){
  console.log('正则表达式');
})

var path = app.use(express.static(__dirname + '/public'));   //静态文件，通过express中间件static获取
// console.log(path);
