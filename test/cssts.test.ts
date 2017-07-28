import * as expect from 'expect';

import CssTs from '../src/cssts';

const styles = `
  .component {
   // comments
   @include some-mixin

   .componentSubcomponent {
     color: red;
   }

   .component-sub-component {
     border: 1px dotted pink;
   }
  }
`;

describe('CssTs', () => {
  describe('.classes', () => {
    it('returns the expected className strings', () => {
      const instance = new CssTs(styles);
      expect(instance.classes()).toEqual(['component', 'componentSubcomponent']);
    });
  })

  describe('.toString', () => {
    it('returns the expected tokens', () => {
      const instance = new CssTs(styles);

      const expectedResult = [
        'interface Styles {',
        '  component: string,',
        '  componentSubcomponent: string,',
        '  [key: string]: string,',
        '}',
        'declare const styles: Styles;',
        'export = styles;',
      ].join('\n');

      expect(instance.toString()).toEqual(expectedResult);
    });
  })
});
