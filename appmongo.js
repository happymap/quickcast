var express = require('express'),
	app = express(),
	server = require('http').createServer(app);

var services = ['Main'];

var initDynamicRoutes = function(server) {
	for (var i = 0; i < services.length; i++) {
		require('./server/' + services[i] + '/' + services[i] + 'Service').attachRoutes(server);
	}
};

// app.use(express.static(__dirname + '/public'));
initDynamicRoutes(app);
server = app.listen(3000, function() {
	console.log('listening on port %d', server.address().port);
});

