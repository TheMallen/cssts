"use strict";
exports.__esModule = true;
module.exports = function typedCssLoader(source, map) {
    this.cacheable && this.cacheable();
    var callback = this.async();
    var options = Object.assign({}, this.options ? this.options : {});
    var creator = new DtsCreator(options);
    creator.create(this.resourcePath, source).then(function (content) {
        content.writeFile().then(function () {
            callback(null, source, map);
        });
    });
};
