var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io');

server = app.listen(3000, function() {
	console.log('listening on port %d', server.address().port);
});

io = io.listen(server);

io.sockets.on('connection', function (socket) {
	socket.on('subscribe', function(room) { 
		socket.join(room); 
		console.log('enter room', room);
	})

	socket.on('unsubscribe', function(room) {
		socket.leave(room);
		console.log('leave room', room);
	})

	socket.on('send', function(data) {
		var senderUserId = data.userId,
		receiverUserId = data.room.replace(senderUserId, "");
		io.sockets.in(data.room).emit('message', data);
	});
});