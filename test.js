// https://github.com/michael-ciniawsky/postcss-load-config

var http=require('http')
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.write('000Nodejs')
    var parm=url.parse(request.url,true).query
    // 发送响应数据 "Hello World"
    //response.write("网站名：" + parm.name);
    //response.write("\n");
    //response.write("网站 URL：" + parm.url);
    var body = "";
    request.on('data',(chunk)=>{body+=chunk})
    request.on('end',()=>{
    	
    	body = querystring.parse(body)   	
    	if(body.name&&body.url){   		
    		    response.write("网站名：" + body.name);
            response.write("<br>");
            response.write("网站 URL：" + body.url);
    	}else{
    		response.write(body.name+'')//转换成string,否则报错
    		
    	}
    	//response.write(body.name)
    	 response.end();
    })
			 var pathname = url.parse(request.url).pathname;
             console.log("Request for " + pathname + " received.");
}).listen(8888);
var dns = require('dns');

dns.lookup('www.hao123.com', function onLookup(err, address, family) {
   console.log('ip 地址:', address);
   dns.reverse(address, function (err, hostnames) {
   if (err) {
      console.log(err.stack);
   }

   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
});  
});
var http = require('http');
 
// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8080',
   path: '/index.html'  
};
 
// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();

var express = require('express');
var app = express();

 
app.get('/kl', function (req, res) {
   res.send('Hello World0');
   res.end('over')
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
