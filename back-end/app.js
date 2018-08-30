var express = require('express');
var app = express();
// 資料庫連線設定
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.136.52.101',
  //host     : '127.0.0.1',
  user     : 'ELAINE',
  password : 'Password1',
  database : 'user'
});
connection.connect(function(err) {
    if (err) {
        console.log(err);
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});


// Controller 及前端靜態檔案URL設定
var UserController = require('./user/UserController');
var RestController = require('./RestController');

app.use(function(req,res,next){
    req.con=connection;
    // req.con.query('SELECT * FROM user', function(err, rows, fields) {
    //     if (err) throw err;
    //         console.log('The solution is: ', rows[0]);
    //     });
    next();
});
app.use('/', express.static(__dirname + '../../front-end/public'));
app.use('/users', UserController);
app.use('/rest',RestController);

module.exports = app;