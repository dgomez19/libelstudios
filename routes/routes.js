console.log("routes");

var path     = require('path');
var appRoot  = path.resolve(__dirname);
var mongoose = require('mongoose');
var User     = require(path.resolve('models/user.server.model.js'));
var User     = mongoose.model('User');

console.log("path.resolve()");
console.log(path.resolve('models/user.server.model.js'));

mongoose.connect('mongodb://localhost/network', {useUnifiedTopology: true, useNewUrlParser : true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 	console.log("exito");
});


app.get('/', function(request, response) {
	response.sendFile(appRoot + '/index.html');
});

app.get('/getUsers', function(request, response) {
	User.find().exec(function(err, result) {
		response.json({ success : true, result : result });
	});
});


app.post('/saveUsers', function(request, response) {

	var user = new User(request.body);

  	user.save(function (err, save) {
  		console.log(err);
  		console.log(save);
  	});

	response.json({ success : true });
});