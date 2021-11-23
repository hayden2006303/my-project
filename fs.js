// https://github.com/michael-ciniawsky/postcss-load-config

var http=require('http')
var fs=require('fs')
var events=require('events')
var eventEmitter=new events.EventEmitter()
var ts=(r)=>console.log(r)
eventEmitter.on('ts',ts)
eventEmitter.emit('ts','258')
fs.readFile('test.txt',(err,data)=>{
				if(err){
					console.log(err)
					return
					
				}
				console.log(data.toString())
				
	})
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('test.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error    
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});
process.stdout.write("Hello World!" + "\n");
console.log(process.hrtime());
fs.open('test.txt','r+',(err,data)=>{
	  if(err) {
	  	 return console.log(err)	  	
	  }
	console.log('打开文件成功')
})
fs.writeFile('test.txt','新写入的文件内容',(err,data)=>{
	
	if(err) {
	  	 return console.log(err)	  	
	  }
	fs.readFile('test.txt',(err,data)=>{
		if(err) {
	  	 return console.log(err)	  	
	  }
		console.log(data.toString())
	})
})
var buf=new Buffer.alloc(160)
fs.open('test2.txt','r+',(err,data)=>{
	  if(err) {
	  	 return console.log(err)	  	
	  }
	console.log('打开文件成功')
	fs.read(data,buf,0,buf.length,0,(err,byte)=>{
		
		 if (err){
             return console.log(err);
          }
      console.log(byte + "  字节被读取");
      
      // 仅输出读取的字节  
      if(byte > 0){
         console.log(buf.slice(0, byte).toString());
      }
	})
	 fs.writeFile(data, 'l',{encoding: 'utf8'}, function(err){
        if (err){
            return console.error(err);
        }
    });
})
var data = '菜鸟23教程官网地址：www.runoob.com23';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据  
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();
fs.appendFile('output.txt', 'data to append000', function (err) {   //数据被添加到文件的尾部  	
    if(err){
	  	 return console.log(err)	  	
	  }	
	  console.log('The "data to append" was appended to file!');
});



var express = require('express');
var app = express();

app.use('/public', express.static('public'));
app.use(function(req, res, next) {//解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
//app.get('/index.html', function (req, res) {
// res.sendFile( __dirname + "/" + "index.html" );
//})
 
app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
   res.end(JSON.stringify(response));
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
//运用post
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
 
app.post('/process_post', urlencodedParser, function (req, res) {
 
   // 输出 JSON 格式    
   var response={}
   if(req.body.first_name==1){
   	  response = {
       "first_name":'前端传入1',
       "last_name":'前端传入2'
      };
   }else{
   	  response = {
       "first_name":'后台返回数据1',
       "last_name":'后台返回数据2'
      };
   }
  
   console.log(response);
  // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
   //res.json(response) 
   res.send(response)
   //res.end(JSON.stringify(response));只能传送字符串与或者buffer
   //res.end()  
})
 
var server = app.listen(8082, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})