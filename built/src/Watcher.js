"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var CssTs_1 = require("./CssTs");
var watch = require('watch-glob').watch;
var Watcher = (function () {
    function Watcher(_a) {
        var glob = _a.glob, cwd = _a.cwd;
        this.onUpdate = noop;
        this.onDelete = noop;
        this.onError = noop;
        this.writeFile = this.writeFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.cwd = cwd;
        this.glob = glob;
    }
    Watcher.prototype.watch = function () {
        watch(glob, { cwd: cwd }, this.writeFile, this.deleteFile);
    };
    Watcher.prototype.on = function (event, cb) {
        switch (event) {
            case 'update':
                this.onUpdate = cb;
                break;
            case 'delete':
                this.onDelete = cb;
                break;
            case 'error':
                this.onError = cb;
                break;
        }
    };
    Watcher.prototype.writeFile = function (filepath) {
        var _this = this;
        fs_1.readFile(filepath, 'utf8', function (readError, source) {
            if (readError) {
                return _this.onError(readError);
            }
            var dtsCreator = new CssTs_1["default"](source);
            var dtsPath = path_1.basename(filepath) + ".d." + path_1.extname(filepath);
            fs_1.writeFile(dtsPath, dtsCreator.toString(), function (writeError) {
                if (writeError) {
                    return _this.onError(writeError);
                }
                _this.onUpdate(filepath, dtsPath);
            });
        });
    };
    Watcher.prototype.deleteFile = function (filepath) {
        var _this = this;
        fs_1.unlink(filepath, function (err) { return _this.onError(err); });
    };
    return Watcher;
}());
exports["default"] = Watcher;
function noop() { }
