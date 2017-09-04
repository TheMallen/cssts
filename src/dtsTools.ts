import {writeFile, readFile, unlink} from 'fs';
import {basename, extname} from 'path';
import CssTs from './CssTs';

function createDtsPath(filepath: string) {
  return `${basename(filepath)}.d.ts`;
}

export function createDts(filepath: string) {
  return new Promise((resolve, reject) => {
    readFile(filepath, 'utf8', (readError, source: string) => {
      if (readError) {
        return reject(readError);
      }

      const dtsCreator = new CssTs(source);
      const dtsPath = createDtsPath(filepath);

      writeFile(dtsPath, dtsCreator.toString(), (writeError) => {
        if (writeError) {
          return reject(writeError);
        }

        resolve({filepath, dtsPath});
      });
    })
  });
}

export function removeDts(filepath: string) {
  return new Promise((resolve, reject) => {
    const dtsPath = createDtsPath(filepath);

    unlink(filepath, (error: Error) => {
      if (error) {
        return reject(error);
      }

      return resolve({filepath, dtsPath});
    });
  });
}
