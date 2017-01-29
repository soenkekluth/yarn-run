#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const npmRunPath = require('npm-run-path');
const execFile = childProcess.execFileSync;
const exec = childProcess.exec;


const command = process.argv[2];
const options = process.argv.slice(3).join(' ');

const commandString = command + (options.length ? ' ' + options : '');

exec(commandString, {
  env: npmRunPath.env()
}, (error, stdout, stderr) => {
  if (error) {
    if(fs.existsSync('./package.json')){
    	const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    	if(pkg.scripts && pkg.scripts[command]){
    		console.log(pkg.scripts, pkg.scripts[command]);
    		exec('yarn run '+ commandString, (err, stdout, stderr) => {
    			console.log(stdout);
    			return;
    		})
    	}
    }
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);

});
