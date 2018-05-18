var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var ejs = require('ejs');
var assert = require('assert');
var mongoose = require('mongoose');

var dbName = "Test";
var dburl = "mongodb://localhost:27017/" + dbName;
var path = __dirname;
var cssPath = path + "/views/css";
var jsPath = path + "/views/js";

mongoose.connect(dburl);

function sleep(ms) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + ms);
};

var server = http.createServer(function(req,res){
	switch (req.url) {
		default :
			res.writeHead(200, {'Content-Type': 'text/html'})
			title = 'Test';
			ejs.renderFile('views/index.ejs', {title: title}, {}, function(err, str) {
				res.end(str);
			});
			break;
		case "/main.css":
			res.writeHead(200, {'Content-Type': 'text/css'})
			var responseStream = fs.createReadStream(cssPath + '/main.css', 'utf8');
			responseStream.pipe(res);
			break;
		case "/main.js":
			res.writeHead(200, {'Content-Type': 'text/javascript'})
			var responseStream = fs.createReadStream(jsPath + '/main.js', 'utf8');
			responseStream.pipe(res);
			break;
	}
});

io = io(server, {
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false
});

io.on('connection', function(socket){
	socket.emit('Test', 'Test%200');
	socket.on('Test', function(req){
		sleep(950);
		test = req.split('%20');
		socket.emit('Test', 'Test%20' + (parseInt(test[1])+1));
	});

	socket.on('createCollection', function(req) {
	});
});
server.listen(3000);