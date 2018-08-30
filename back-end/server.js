var app = require('./app');
var port = process.env.PORT || 4000;

var server = app.listen(port, function() {
  console.log('Server listening on port :' + port);
});