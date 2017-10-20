let fs = require('fs');

let logFile = function (file) {};

logFile.prototype.add = function (message) {
	
	fs.appendFile('app.log', message + '\n', function (err) {
		if (err) return console.log(err);
	});

};

module.exports = new logFile();