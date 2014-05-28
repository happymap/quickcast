var socket = io.connect('http://localhost:3000');
var data = {
	objectId: 111111111,
	accountId: 222222222
};

function subscribe() {
	console.log('subscribed');
	socket.emit('subscribe', data);
}

function unsubscribe() {
	console.log('unsubscribed');
	socket.emit('unsubscribe', data);
}

socket.on('connect', function() {
	$('.state').text('Connected');
	console.log('connected');
});

socket.on('event', function() {
	$('.state').text('event');
});

socket.on(data.objectId, function(data) {
	console.log('get number updated');
	$('.state').text('there are ' + data.num + ' are editing object: ' + data.objectId);
});

socket.on('disconnect', function() {
	$('.state').text('Dosconected');
});