"use strict";
exports.__esModule = true;
var CLASS_REGEX = /(\.(?:\w*(-?\w*)*))/g;
var CssTs = (function () {
    function CssTs(rawCss) {
        this.rawCss = rawCss;
    }
    CssTs.prototype.classes = function () {
        var classTokens = this.rawCss.match(CLASS_REGEX);
        if (classTokens == null) {
            return [];
        }
        return classTokens
            .filter(function (className) { return className.indexOf('-') === -1; })
            .map(function (className) { return className.slice(1); });
    };
    CssTs.prototype.toString = function () {
        var classNames = this.classes();
        var classDefinitions = classNames
            ? classNames
                .map(function (className) { return " " + className + ": string,\n"; })
                .join('')
            : '';
        return ('interface Styles {' + '\n' +
            classDefinitions +
            ' [key: string]: string,' + '\n' +
            '}' + '\n' +
            'declare const styles: Styles;' + '\n' +
            'export = styles;' + '\n');
    };
    return CssTs;
}());
exports["default"] = CssTs;
