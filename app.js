var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io');

const redis = require('redis');
const redisClient = redis.createClient();

redisClient.flushdb();

app.use(express.static(__dirname + '/public'));

server = app.listen(3000, function() {
	console.log('listening on port %d', server.address().port);
});

io = io.listen(server);

io.sockets.on('connection', function (socket) {

	socket.on('subscribe', function(data) { 
		
		socket.join(data.objectId);

		var socketId = socket.id;
		var objectId = data.objectId;
		var accountId = data.accountId;

		//Store account/socket pairs viewing the objectId
		redisClient.hset(objectId, socketId, accountId, redis.print);

		//Index for getting objectId with socketId
		redisClient.sadd(socketId, objectId);

		//Return the number of connected accounts
		broadcast(objectId);

		console.log('enter room', objectId);

	})

	socket.on('unsubscribe', function(data) {
		
		socket.leave(data.objectId);

		var socketId = socket.id;
		var objectId = data.objectId;
		var accountId = data.accountId;

		//remove account/socket pair
		redisClient.hdel(objectId, socketId);

		//remove index
		redisClient.srem(socketId, objectId);

		broadcast(objectId);

		console.log('leave room', objectId);
	})

	socket.on('disconnect', function() {

		redisClient.smembers(socket.id, function(err, objects) {
			//remove user's observation for each object
			objects.forEach(function(objectId) {
				redisClient.hdel(objectId, socket.id);
				//remove index for this socket id
				
				redisClient.srem(socket.id, objectId);

				broadcast(objectId);
			});
			
		});

		console.log('disconnected from client');
	});
});

function broadcast(objectId) {
	redisClient.hlen(objectId, function(err, len) {
		io.sockets.in(objectId).emit(objectId, {
			num: len,
			objectId: objectId
		});
	});
}