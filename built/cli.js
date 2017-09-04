#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var Watcher_1 = require("./Watcher");
var yargs = require('yargs');
var argv = yargs.command('watch')
    .option('pattern')
    .option('cwd')["default"]({
    pattern: ['./*.css', './**/*.css'],
    cwd: '.'
})
    .alias('p', 'pattern')
    .alias('c', 'cwd')
    .alias('h', 'help')
    .argv;
var glob = argv.pattern, cwd = argv.cwd;
var watcher = new Watcher_1["default"]({ glob: glob, cwd: cwd });
watcher.on('error', function (err) {
    console.error('🔴 Error: ', err);
});
watcher.on('update', function (originalFilepath, dtsPath) {
    console.error("\u2705 Created new dtsFile for " + originalFilepath + " \u27A1\uFE0F " + dtsPath);
});
watcher.on('delete', function (originalFilepath, dtsPath) {
    console.error("\uD83D\uDD25 Removed " + originalFilepath + " \u27A1\uFE0F " + dtsPath);
});
watcher.watch();
