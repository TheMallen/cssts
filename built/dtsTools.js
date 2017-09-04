"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var CssTs_1 = require("./CssTs");
function createDtsPath(filepath) {
    return path_1.basename(filepath) + ".d.ts";
}
function createDts(filepath) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(filepath, 'utf8', function (readError, source) {
            if (readError) {
                return reject(readError);
            }
            var dtsCreator = new CssTs_1["default"](source);
            var dtsPath = createDtsPath(filepath);
            fs_1.writeFile(dtsPath, dtsCreator.toString(), function (writeError) {
                if (writeError) {
                    return reject(writeError);
                }
                resolve({ filepath: filepath, dtsPath: dtsPath });
            });
        });
    });
}
exports.createDts = createDts;
function removeDts(filepath) {
    return new Promise(function (resolve, reject) {
        var dtsPath = createDtsPath(filepath);
        fs_1.unlink(filepath, function (error) {
            if (error) {
                return reject(error);
            }
            return resolve({ filepath: filepath, dtsPath: dtsPath });
        });
    });
}
exports.removeDts = removeDts;
