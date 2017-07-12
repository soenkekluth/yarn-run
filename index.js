#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const npmRunPath = require('npm-run-path');
const execFile = childProcess.execFileSync;
const spawn = childProcess.spawn;


const command = process.argv[2];
const options = process.argv.slice(3).join(' ');

const commandString = command + (options.length ? ' ' + options : '');

var opts = {
  stdio: 'inherit',
  shell: true,
  env: npmRunPath.env()
};

spawn(commandString, opts, (error) => {
  if (error) {
    if(fs.existsSync('./package.json')){
    	const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    	if(pkg.scripts && pkg.scripts[command]){
    		console.log(pkg.scripts, pkg.scripts[command]);
    		spawn('yarn run '+ commandString, opts);
    	}
    }
    console.error(`exec error: ${error}`);
    return;
  }
});
