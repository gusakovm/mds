let fs = require('fs');
let process = require('process');

let logFile = function () {
	this.defaultFile = 'app.log';
};

logFile.prototype.add = function (message) {
	
		if (typeof this.fileChecked !== 'undefined') return false;
	
		let filePath = this.filePath( this.defaultFile );
	
		if (this.checkFile(filePath)) {
			fs.appendFile(filePath, message + '\n', (err) => {
				if (err) return console.log(err);
			});	
		}	
	
};
	
/* Return whole filepath */
logFile.prototype.filePath = function (filename) {
	
	if (typeof global.__dirname == 'undefined') {
		global.__dirname = process.cwd();
	}

	return global.__dirname + '/logs/' + filename;
	
};

logFile.prototype.checkFile = function (filePath) {

	if (typeof this.fileChecked !== 'undefined') {
		return true;
	} else {
		let path = this.filePath('');
		
		fs.stat(path, (err) => {
			if ((err !== null) && (err.code == 'ENOENT')) {
				fs.mkdirSync(path);
			}
		});
		
		fs.stat(filePath, (err) => {
			if(err == null) {
			} else if(err.code == 'ENOENT') {
				fs.closeSync(fs.openSync(filePath, 'wx'));
			}
		});
	
		this.fileChecked = true;
	
		return true;
	}

};

module.exports = new logFile();