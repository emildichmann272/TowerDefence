var socket = io('http://localhost:3000');

socket.on('Test', function(data){
	socket.emit('Test', data);
	document.getElementById("serverData")
	.innerHTML = data.replace('%20', ' ');
});

socket.on('createCollectionSuccess', function(result) {
	document.getElementById("collectionStatus").innerHTML = "Creation of the collection was a success! :)";
});

socket.on('createCollectionFailed', function(result) {
	document.getElementById("collectionStatus").innerHTML = "Creation of the collection failed :(";
});

var btn = document; //.getElementById('createCollectionBtn');
btn.addEventListener('click', createCollection);

function createCollection() {
	console.log("createCollection");
	if (document.getElementById("createCollectionName").value != '') {
		socket.emit('createCollection', [document.getElementById("createCollectionName").innerHTML, null]);
	} else {
		console.log('Please insert a name!');
	};
};
