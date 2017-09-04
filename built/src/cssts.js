"use strict";
exports.__esModule = true;
var CLASS_REGEX = /(\.(?:\w*(-?\w*)*))/g;
var CssTs = (function () {
    function CssTs(rawCss) {
        this.rawCss = rawCss;
    }
    CssTs.prototype.classes = function () {
        return this.rawCss
            .match(CLASS_REGEX)
            .filter(function (className) { return className.indexOf('-') === -1; })
            .map(function (className) { return className.slice(1); });
    };
    CssTs.prototype.toString = function () {
        var classes = this.classes()
            .map(function (className) { return "  " + className + ": string,"; })
            .reduce(function (accumulator, propertyDefinition) {
            return accumulator + "\n" + propertyDefinition;
        });
        return [
            'interface Styles {',
            "" + classes,
            '  [key: string]: string,',
            '}',
            'declare const styles: Styles;',
            'export = styles;',
        ].join('\n');
    };
    return CssTs;
}());
exports["default"] = CssTs;
