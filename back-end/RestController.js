var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var formUpload=upload.fields([{name:'name',maxCount:1},{name:'email',maxCount:1},{name:'password',maxCount:1}]);


var gary={
	name:'gary',
	age:18,
	description:'hello world'
};

router.get('/',function(req,res){
	 res.send('success');
	 console.log('req :'+req);
	var formData=req.body;
	var responseData="";
	var insertRowId=0;
	/*req.con.query('SELECT u_id,name,email,password FROM user_table WHERE u_id=?',result.insertId,function(err,result,fields){
			if(err)throw err;
			responseData=result;
			console.log(result);
			// console.log(responseData);
			res.send(JSON.stringify(responseData));
		});*/	
	req.con.query('SELECT * FROM user_table', function(err, result, fields) {
		if (err) throw err;
		result.forEach(element => {
			console.log('The solution is: ', element);
		});										
		res.end(JSON.stringify(result));
    });	
});    
router.post('/',formUpload,function(req,res){
	console.log('req :'+req);
	var formData=req.body;
	var responseData="";
	var insertRowId=0;
	req.con.query('INSERT INTO user_table SET ?',{name:formData.name,email:formData.email,password:formData.password},function (err,result,fields){
	 	if (err) throw err;
		//results.forEach(element => {
			console.log(result.insertId);	//	});	
	 	 //});
	req.con.query('SELECT u_id,name,email,password FROM user_table WHERE u_id=?',result.insertId,function(err,result,fields){
			if(err)throw err;
			responseData=result;
			console.log(result);
			// console.log(responseData);
			res.send(JSON.stringify(responseData));
		});	
	});	
});
	//res.send(result);
    /*var result=connection.query('SELECT * FROM user', function(err, rows, fields) {
	if (err) throw err;
	if(err){
	console.log("error :"+err);
	 	}
	console.log('The solution is: ', rows[0]);
	return rows;
    });    
});*/
	router.put('/:id',formUpload,function(req,res,next){
	console.log(req.params.id);
	console.log('put request body name: '+req.body.name);
	// console.log('put request body: '+JSON.stringify(req.body));
	res.send(req.params.id);
});
module.exports = router;