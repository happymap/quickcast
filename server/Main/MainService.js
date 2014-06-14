var Module = function() {

};

Module.prototype.attachRoutes = function (server) {
	server.get('/*', this.processRequest);
};

/*
request data samp;e:
{
	action: 'add'
	data: {
		msg: 'hi, how are you?',
		uid: '5361E28BDD2E61EE26000007'
	}
}
*/
Module.prototype.processRequest = function (req, res, next) {
	var params;
	if (req && req.url) {
		params = req.url.split('/');
	}

	if (params && params.length > 0) {
		if (!params[0]) {
			params = params.slice(1, params.length);
		}
	}
};

Module.prototype.addValue = function (params, data) {

};

Module.prototype.getValue = function (params, data) {

};

Module.prototype.deleteValue = function (params) {

};



var instance = new Module();
module.exports = instance;

