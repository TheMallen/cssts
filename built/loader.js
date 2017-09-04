"use strict";
exports.__esModule = true;
var CssTs_1 = require("./CssTs");
var fs_1 = require("fs");
var path_1 = require("path");
module.exports = function typedCssLoader(source, map) {
    this.cacheable && this.cacheable();
    var callback = this.async();
    var options = this.options ? this.options : {};
    var dtsCreator = new CssTs_1["default"](source);
    var dtsPath = path_1.basename(this.resourcePath) + ".d." + path_1.extname(this.resourcePath);
    fs_1.writeFile(dtsPath, dtsCreator.toString(), function (error) {
        callback(error, source, map);
    });
};
