var socket = io('http://93.161.6.30:3000');

socket.on('Test', function(data){
	socket.emit('Test', data);
	document.getElementById("serverData")
	.innerHTML = data.replace('%20', ' ');
});