"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var globby = require("globby");
var CssTs_1 = require("./CssTs");
var watch = require('watch-glob');
var Watcher = (function () {
    function Watcher(_a) {
        var glob = _a.glob, cwd = _a.cwd;
        this.onUpdate = noop;
        this.onDelete = noop;
        this.onError = noop;
        this.createDts = this.createDts.bind(this);
        this.removeDts = this.removeDts.bind(this);
        this.cwd = cwd;
        this.glob = glob;
    }
    Watcher.prototype.watch = function () {
        var _this = this;
        var _a = this, glob = _a.glob, cwd = _a.cwd;
        globby(glob, { cwd: cwd })
            .then(function (paths) {
            var promises = paths.map(_this.createDts);
            return Promise.all(promises);
        })
            .then(function () {
            console.log('👀 watching', cwd, glob);
            watch(glob, { cwd: cwd }, _this.createDts, _this.removeDts);
        })["catch"](this.onError);
    };
    Watcher.prototype.on = function (event, cb) {
        console.log('event', event);
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
    Watcher.prototype.createDts = function (filepath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs_1.readFile(filepath, 'utf8', function (readError, source) {
                if (readError) {
                    reject(readError);
                    return _this.onError(readError);
                }
                var dtsCreator = new CssTs_1["default"](source);
                var dtsPath = path_1.basename(filepath) + ".d.ts";
                fs_1.writeFile(dtsPath, dtsCreator.toString(), function (writeError) {
                    if (writeError) {
                        reject(writeError);
                        return _this.onError(writeError);
                    }
                    resolve(dtsPath);
                    _this.onUpdate(filepath, dtsPath);
                });
            });
        });
    };
    Watcher.prototype.removeDts = function (filepath) {
        var _this = this;
        fs_1.unlink(filepath, function (err) { return _this.onError(err); });
    };
    return Watcher;
}());
exports["default"] = Watcher;
function noop() { }
