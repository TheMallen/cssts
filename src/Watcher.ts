import {writeFile, readFile, unlink} from 'fs';
import {basename, extname} from 'path';
import * as globby from 'globby';
import CssTs from './CssTs';
const watch = require('watch-glob');

interface ChangeCallback {
  (originalFilePath: string, dtsPath: string): void,
}
interface ErrorCallback {
  (error: Error): void,
}
interface Options {
  glob: string,
  cwd: string,
}

export default class Watcher {
  private onUpdate: ChangeCallback = noop;
  private onDelete: ChangeCallback = noop;
  private onError: ErrorCallback = noop;
  private cwd: string;
  private glob: string;

  constructor({glob, cwd}: Options) {
    this.createDts = this.createDts.bind(this);
    this.removeDts = this.removeDts.bind(this);
    this.cwd = cwd;
    this.glob = glob;
  }

  watch() {
    const {glob, cwd} = this;

    globby(glob, {cwd})
      .then((paths: string[]) => {
        const promises = paths.map(this.createDts);
        return Promise.all(promises);
      })
      .then(() => {
        console.log('👀 watching', cwd, glob);
        watch(glob, {cwd}, this.createDts, this.removeDts);
      })
      .catch(this.onError);
  }

  on(event: 'update' | 'delete' | 'error', cb: ChangeCallback | ErrorCallback): void {
    switch (event) {
      case 'update':
        this.onUpdate = cb as ChangeCallback;
        break;
      case 'delete':
        this.onDelete = cb as ChangeCallback;
        break;
      case 'error':
        this.onError = cb as ErrorCallback;
        break;
    }
  }

  private createDts(filepath: string) {
    return new Promise((resolve, reject) => {
      readFile(filepath, 'utf8', (readError, source: string) => {
        if (readError) {
          reject(readError);
          return this.onError(readError);
        }

        const dtsCreator = new CssTs(source);
        const dtsPath = `${basename(filepath)}.d.ts`

        writeFile(dtsPath, dtsCreator.toString(), (writeError) => {
          if (writeError) {
            reject(writeError);
            return this.onError(writeError);
          }

          resolve(dtsPath);
          this.onUpdate(filepath, dtsPath);
        });
      })
    });
  }

  private removeDts(filepath: string) {
    unlink(filepath, (err: Error) => this.onError(err))
  }
}

function noop() {}
