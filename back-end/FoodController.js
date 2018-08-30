var express = require('express');
var router = express.Router();
var multer  = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ dest: 'uploads/' })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var formUpload=upload.fields([{name:'name',maxCount:1},{name:'price',maxCount:1}]);
router.post('',formUpload,function (req, res,next) {
	// req.body contains the text fields
	var formData=req.body;
	var date=new Date();
	var formatedDate=date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDate();
	// console.log(date);
	var responseData="";
	var insertRowId=0;
	req.con.query('INSERT INTO food SET ?',{name:formData.name,price:formData.price,create_date:formatedDate} ,function(err,results,fields){
		if(err)throw err;
		console.log(results.insertId);
		// results.forEach(e=>{console.log('element of results:'+e)});		
		// insertRowId=results.insertId;				
		req.con.query('SELECT ID,NAME,PRICE,CREATE_DATE FROM food WHERE ID=?',results.insertId,function(err,results,fields){
			if(err)throw err;
			responseData=results;
			console.log(results);
			// console.log(responseData);
			res.send(JSON.stringify(responseData));
		});			
	});
	// console.log('insertRowId'+insertRowId);
	// while(insertRowId!=undefined){
	// 	console.log('insertRowId'+insertRowId);
	// 	req.con.query('SELECT ID,NAME,PRICE,CREATE_DATE FROM food WHERE ID=?',insertRowId,function(err,results,fields){
	// 		if(err)throw err;
	// 		responseData=results;
	// 		console.log(results);
	// 		console.log(responseData);
	// 	});
	// 	break;
	// }
	// console.log('req.body :'+JSON.stringify(req.body));
	// console.log('req.body :'+JSON.stringify(params));
	// console.log('params keys :'+req.body.age);
		
	
});

	
router.get('/',function(req,res,next){			
	req.con.query('SELECT * FROM user', function(err, results, fields) {
		if (err) throw err;
		results.forEach(element => {
			console.log('The solution is: ', element);
		});										
		res.end(JSON.stringify(results));
	});	
});	

router.put('/:id',formUpload,function(req,res,next){
	console.log(req.params.id);
	console.log('put request body name: '+req.body.name);
	// console.log('put request body: '+JSON.stringify(req.body));
	res.send(req.params.id);
});


router.delete('/:itemId',function(req,res,next){
	console.log(req.params.itemId);
	res.send(req.params.itemId);
});


router.post('/profile',formUpload,function(req,res,next){
	console.log("host"+req.host);
	var params  = req.body;
	console.log('req :'+req.body.name);
	console.log('req :'+req.body.age);
	console.log('req:'+req.body.description);
	console.log('req:'+req.body.email);
	var errorObject={
		errormessage:500

	}
	// var successObject=params;
		
	
	if(!req.body.email.includes('@')){
		res.send(errorObject);
	}else{
		res.send(params);
	}
	// req.con.query('',function(err,row,fields){

	// })
});

module.exports = router;