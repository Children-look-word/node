//导入核心模块
var express=require('express');
var fs=require('fs');
var router=require('./router.js');

//导入post请求模板
var bodyParser = require('body-parser');

var app=express();


app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));


//导入模板引擎
app.engine('html', require('express-art-template'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


//挂载路由
app.use(router);


app.listen(3000,function(){
	console.log('running....')
})
