#!/usr/bin/env node
import {createDts, removeDts} from './dtsTools';
import * as watch from 'glob-watcher';
const yargs = require('yargs');

const argv = yargs.command('watch')
  .option('pattern')
  .default({
    pattern: ['./*.css', './**/*.css'],
  })
  .alias('p', 'pattern')
  .alias('h', 'help')
  .argv;

const {pattern} = argv;
const watcher = watch(pattern, {ignoreInitial: false});

function handleError(error: string) {
  console.log('🔴 Error: ', error)
}

watcher.on('change', (path: string) => {
  return createDts(path)
    .then(({dtsPath}) => {
      console.log('✅ Dts updated', dtsPath);
    })
    .catch(handleError);
});

watcher.on('add', (path: string) => {
  return createDts(path)
    .then(({filePath, dtsPath}) => {
      console.log('✨ Dts created for ', filePath, '➡️', dtsPath);
    })
    .catch(handleError);
});

watcher.on('unlink', (path: string) => {
  return removeDts(path)
    .then(({filePath, dtsPath}) => {
      console.log('🔥 Dts removed for ', filePath, '➡️', dtsPath);
    })
    .catch(handleError);
});

