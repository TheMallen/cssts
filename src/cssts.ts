const CLASS_REGEX = /(\.(?:\w*(-?\w*)*))/g;

export default class CssTs {
  constructor(private rawCss: string) {}

  classes() {
    return this.rawCss
      .match(CLASS_REGEX)
      .filter((className: string) => className.indexOf('-') === -1)
      .map((className: string) => className.slice(1));
  }

  toString() {
    const classes = this.classes()
      .map((className: string) => `  ${className}: string,`)
      .reduce((accumulator: string, propertyDefinition: string) => {
        return `${accumulator}\n${propertyDefinition}`;
      });
    return [
      'interface Styles {',
      `${classes}`,
      '  [key: string]: string,',
      '}',
      'declare const styles: Styles;',
      'export = styles;',
    ].join('\n');
  }
}

