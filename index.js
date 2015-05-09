var express = require("express"),json;
var fs = require("fs");
var app = express();
var port = process.env.PORT || 8080;;
var list = [];

function readJsonFile(filepath) {

	var file = fs.readFileSync(filepath, "utf8");
	return JSON.parse(file);

}

function getConfigData(file) {

	var filepath = __dirname + "/" + file;
	return readJsonFile(filepath);

}

json = getConfigData('config.data');

console.log(''+json.members.length);

for(var i=0 ; i < json.members.length; i++) {
	
	console.log(''+json.members[i].name);	
	console.log(''+json.members[i].udid);

}

app.get("/", function(req, res){
    res.send("It works!"+list);
});

app.get("/history",function(req,res){
	res.send("history \n"+list);
});
 
var io = require('socket.io').listen(app.listen(port));


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
    	console.log('message received '+data);	
        io.sockets.emit('message', data);
        list.push(data);
    });
	
	console.log('connection attempt was made');

});

console.log("Listening on port " + port);


