
//路由模块  
var express=require('express');
var fs=require('fs');

var db=require('./student.js')
//创建路由模块
var router=express.Router();

//将路由挂载到模块中去
router.get('/',function(req,res){
	db.find(function(err,students){
		if(err){
			return res.status(500).send('Server error.');
		}
		res.render('index.html', {
			stu:students
		})
	})
});

router.get('/post',function(req,res){
	res.render('post.html');
})

router.post('/post',function(req,res){
	db.update(req.body,function(err,data){
		if(err){
			return res.status(500).send('Server error.');
		}
		res.redirect('/');
	})
})

router.get('/edit',function(req,res){
	db.findID(parseInt(req.query.id),function(err,student){
		if(err){
			return res.status(500).send('Server error.');
		}
		res.render('new.html',{
			student:student
		})
	})
});


router.post('/edit',function(req,res){
	db.edit(req.body,function(err){
		if(err){
			return res.status(500).send('Server error.');
		}
		res.redirect('/');
	})
})



//删除
router.get('/delete',function(req,res){
	db.Delete(parseInt(req.query.id),function(err){
		if(err){
			return res.status(500).send('Server error.');
		}
		res.redirect('/');
	})
})





//将路由导出去
module.exports=router;