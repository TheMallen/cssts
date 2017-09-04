const CLASS_REGEX = /(\.(?:\w*(-?\w*)*))/g;

export default class CssTs {
  constructor(private rawCss: string) {}

  classes() {
    const classTokens = this.rawCss.match(CLASS_REGEX);

    if (classTokens == null) {
      return [];
    }

    return classTokens
      .filter((className: string) => className.indexOf('-') === -1)
      .map((className: string) => className.slice(1));
  }

  toString() {
    const classNames = this.classes();

    const classDefinitions = classNames
      ? classNames
        .map((className: string) => ` ${className}: string,\n`)
        .join('')
      : '';

    return (
      'interface Styles {' + '\n' +
      classDefinitions +
      ' [key: string]: string,' + '\n' +
      '}' + '\n' +
      'declare const styles: Styles;' + '\n' +
      'export = styles;' + '\n'
    );
  }
}

