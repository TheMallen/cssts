#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var dtsTools_1 = require("./dtsTools");
var watch = require("glob-watcher");
var yargs = require('yargs');
var argv = yargs.command('watch')
    .option('pattern')["default"]({
    pattern: ['./*.css', './**/*.css']
})
    .alias('p', 'pattern')
    .alias('h', 'help')
    .argv;
var pattern = argv.pattern;
var watcher = watch(pattern, { ignoreInitial: false });
function handleError(error) {
    console.log('🔴 Error: ', error);
}
watcher.on('change', function (path) {
    return dtsTools_1.createDts(path)
        .then(function (_a) {
        var dtsPath = _a.dtsPath;
        console.log('✅ Dts updated', dtsPath);
    })["catch"](handleError);
});
watcher.on('add', function (path) {
    return dtsTools_1.createDts(path)
        .then(function (_a) {
        var filePath = _a.filePath, dtsPath = _a.dtsPath;
        console.log('✨ Dts created for ', filePath, '➡️', dtsPath);
    })["catch"](handleError);
});
watcher.on('unlink', function (path) {
    return dtsTools_1.removeDts(path)
        .then(function (_a) {
        var filePath = _a.filePath, dtsPath = _a.dtsPath;
        console.log('🔥 Dts removed for ', filePath, '➡️', dtsPath);
    })["catch"](handleError);
});
