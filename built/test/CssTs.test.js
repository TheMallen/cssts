"use strict";
exports.__esModule = true;
var expect = require("expect");
var cssts_1 = require("../cssts");
var styles = "\n  .component {\n   // comments\n   @include some-mixin\n\n   .componentSubcomponent {\n     color: red;\n   }\n\n   .component-sub-component {\n     border: 1px dotted pink;\n   }\n  }\n";
describe('CssTs', function () {
    describe('.classes', function () {
        it('returns the expected className strings', function () {
            var instance = new cssts_1["default"](styles);
            expect(instance.classes()).toEqual(['component', 'componentSubcomponent']);
        });
    });
    describe('.toString', function () {
        it('returns the expected tokens', function () {
            var instance = new cssts_1["default"](styles);
            var expectedResult = [
                'interface Styles {',
                ' component: string,',
                ' componentSubcomponent: string,',
                ' [key: string]: string,',
                '}',
                'declare const styles: Styles;',
                'export = styles;\n',
            ].join('\n');
            expect(instance.toString()).toEqual(expectedResult);
        });
    });
});
