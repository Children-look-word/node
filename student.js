// 处理数据 自己 创建api
//这里这处理数据 不关心 业务

var fs = require('fs');
var path='./db.json';



//获取页面
exports.find=function(callback){
	fs.readFile(path,'utf-8',function(err,data){
		if(err){
			return callback(err);
		}
		return callback(null,JSON.parse(data).students)
	})
}

//添加学生 
exports.update=function(student,callback){
	fs.readFile(path,'utf-8',function(err,data){
		if(err){
			return callback(err);
		}
		
		//将json数据转换成对象
		var students=JSON.parse(data).students;
		
		//获取数据最后的id
		student.id=parseInt(students[students.length-1].id)+1;
		
		//将数据加入到json数据中
		students.push(student);
		
		//在将数据转换成字符串形式 写入到文件中
		var data=JSON.stringify({
			students:students
		});
		
		fs.writeFile(path,data,function(err){
			if(err){
				//写入失败
				return callback(err);
			}
			//写入成功
			callback(null);
		})
		
	})
}


//获取id 拿到数据
exports.findID=function(id,callback){
	fs.readFile(path,'utf-8',function(err,data){
		if(err){
			return callback(err);
		}
		var students=JSON.parse(data).students
	
		var stu=students.find(function(item){
			return item.id===id;
		});
		
		callback(null,stu);
	});
}


//编辑 学生 并保存
exports.edit=function(student,callback){
	fs.readFile(path,'utf-8',function(err,data){
		if(err){
			return callback(err);
		}
		
		var students=JSON.parse(data).students;
		
		
		//把字符串 转成数字成数字类型
		var stu=students.find(function(item){
			return item.id===parseInt(student.id);
		});
		
		for(var key in student){
			stu[key]=student[key]
		}
		
		//再把数据 转换成字符串
		
		var dbdate = JSON.stringify({
	      students: students
	    });
		
		fs.writeFile(path,dbdate,function(err){
			if(err){
				//写入失败
				return callback(err);
			}
			//写入成功
			callback(null);
		})
	});
}


//删除
exports.Delete=function(id,callback){
	fs.readFile(path,'utf-8',function(err,data){
		if(err){
			return callback(err);
		}
		
		var students=JSON.parse(data).students;
		
		var deleId=students.findIndex(function(item){
			return item.id===parseInt(id);
		})
		
		students.splice(deleId,1);
		
		for(var i=0;i<students.length;i++){
			students[i].id=i+1
		}
		
		var dbdate = JSON.stringify({
	      students: students
	    });
		
		fs.writeFile(path,dbdate,function(err){
			if(err){
				//写入失败
				return callback(err);
			}
			//写入成功
			callback(null);
		})
	})
}

