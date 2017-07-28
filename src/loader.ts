import CssTs from './CssTs';
import {writeFile} from 'fs';
import {basename, extname} from 'path';

module.exports = function typedCssLoader(source: string, map: any) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  const options = this.options ? this.options : {};
  const dtsCreator = new CssTs(source);
  const dtsPath = `${basename(this.resourcePath)}.d.${extname(this.resourcePath)}`

  writeFile(dtsPath, dtsCreator.toString(), (error) => {
    callback(error, source, map)
  });
};
