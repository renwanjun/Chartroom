var http=require('http');  // node内置HTTP模块提供HTTP服务器和客户端功能
var fs=require('fs');      //内置的文件系统模块提供了与文件系统相关的功能
var path=require('path');  //内置的path模块提供与文件系统路径相关的功能
var mime=require('mime');  // 第三方模块mime，有根据文件扩展名得出MIME类型的能力，用于设置HTTP头的Content-Type类型

var connect=require('connect');
var app=connect();
app.use(logger);
app.use('/admin',restrict);
app.use('/admin',admin);
// app.use(hello);
app.listen(3002);

// logger中间件组件
function logger(req,res,next){
    console.log('%s %s',req.method,req.url);
    next();
}

function hello(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
}

function restrict(req,res,next){
    var authorization=req.headers.authorization;
    if(!authorization)return next(new Error('Unauthorized'));

    var parts=authorization.split('');
    var scheme=parts[0];
    var auth=new Buffer(parts[1],'base64').toString().split(':');
    var user=auth[0];
    var pass=auth[1];
    authenticateWithDataBase(user,pass,function(err){
         if(err) return next(err);
         next();
     });

}

function admin(req,res,next){
    switch(req.url){
        case '/':
        res.end('try /users');
        break;
        case '/users':
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(['tobi','loki']));
        break;
    
    }
}

// var cache={};

// // 404错误页面
// function send404(response){
//     response.writeHead(404,{'Content-Type':'text/plain'});
//     response.write('Error 404:response not found.');
//     response.end();
// }

// // 文件数据服务
// function sendFile(response,filePath,fileContents){
//     response.writeHead(
//         200,
//         {"content-type":mime.lookup(path.basename(filePath))}
//     );
//     response.end(fileContents);
// }

// // 获取文件
// function serveStatic(response,cache,absPath){
//     // 检查文件是否再缓存中
//     if(cache[absPath]){
//         sendFile(response,absPath,cache[absPath]); //从内存中返回文件
//     }else{
//         // 检查文件是否存在
//         fs.exists(absPath,function(exists){
//             if(exists){
//                 fs.readFile(absPath,function(err,data){  //从硬盘中读取文件
//                     if(err){
//                         send404(response);
//                     }else{
//                         cache[absPath]=data;
//                         sendFile(response,absPath,data); // 从硬盘中读取文件并且返回
//                     }
//                 })
//             }else{
//                 send404(response);  // 发送HTTP 404响应
//             }
//         })
//     }
// };

// function helloworld(response){
//     response.writeHead(
//         200,
//         {'Content-Type':'text/plain'}
//     );
//     response.write('Hello World.');
//     response.end();
// }

// // 创建HTTP服务器
// var server=http.createServer(function(request,response){
//     console.log(request);
//     var filePath=false;
//     if(request.url=='/'){
//         filePath='public.index.html';
//     }else{
//         if(request.url=='/hello'){
//             return helloworld(response);
//         }
//         filePath='public'+request.url;
//     }
//     var absPath='./'+filePath;
//     serveStatic(response,cache,absPath);
// });

// // 启动服务端口3002
// server.listen(3002,function(){
//     console.log("Server listening on port 3002");
// })


// http.createServer(function(request,response){
//     if(request.url=='/hello'){
//             response.writeHead(
//             200,
//             {'Content-Type':'text/plain'}
//         );
//         response.write('Hello World.');
//         response.end();
//     }
//   //  console.log(request);
    
// });

// server.listen(3002,function(){
//     console.log("Server listening on port 3002");
// })