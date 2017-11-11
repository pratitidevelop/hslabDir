
const fs = require('fs');
var fileNameForChange = process.argv[2];
console.log("watching this file: ", fileNameForChange);

var chokidar = require('chokidar');

var watcher = chokidar.watch(fileNameForChange, {
  ignoreInitial:true
}); 

watcher
      .on('change',  function(path) { 
			console.log("File " + path + " has been changed");
			lastChangesToFile()
			.then((tailContent)=>{
				console.log("changed content of file last few 10 lines:  ",tailContent);
			})
			.catch((tailContentError)=> {
				console.log(tailContentError);
			})
			
		 })




const execFile = require('child_process').execFile;

function lastChangesToFile() {
	return new Promise((resolve, reject) => {
		const child = execFile('tail', [fileNameForChange], (error, stdout, stderr) => {
	    	if (error) {
	    	    //console.error('stderr', stderr);
        		reject(error);
    		}
    		//console.log('stdout', stdout);
			child.kill();
			resolve(stdout);
		});
		
		
	});
}








