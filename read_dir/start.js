let http = require('http'),
	fs = require('fs'),
	path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');


});

let writeToFile = function (row) {
	/* stream.once('open', (fd) => {
		stream.write( row + '\n');
		stream.end();		
	}); */
	// fs.writeFileSync('dir.txt', row + '\n');
	// fs.appendFileSync('dir.txt', row + '\n', function () {
	// 	if (err) throw err;
	// 	console.log('Saved!');
	// });
		var logStream = fs.createWriteStream('dir.txt', {'flags': 'a'});
		logStream.write(row + '\n');
		logStream.end();
};

let readDir = function (dir) {

	let cdir = [];
	let filelist = fs.readdirSync(dir);

	filelist.forEach(function(file, index) {
		if (fs.statSync(dir + '/' + file).isDirectory()) {
			cdir.push({
				'name' : file,
				'dir' : readDir(dir + '/' + file)
			});
			filelist[index] = readDir(dir + '/' + file);
		} else {
			cdir.push( addFile(file) );
		}
	});

	return cdir;
}

let addFile = function (file) {
	return { 'name' : file };
};

let showDir = function (fileList, tab) {
	tab = tab || "";
	fileList.forEach(function (file, index) {
		writeToFile(tab + file['name']);
		// console.info(tab + file['name']);
		if (typeof file['dir'] !== 'undefined') {
			showDir( file['dir'], tab + '	');
		}
	});
};

var filename = 'dir.txt';
// var stream = fs.createWriteStream(filename);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

  showDir( readDir(__dirname + '/..') );

//   stream.end();
