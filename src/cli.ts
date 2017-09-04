#!/usr/bin/env node
import Watcher from './Watcher';
const yargs = require('yargs');

const argv = yargs.command('watch')
  .option('pattern')
  .option('cwd')
  .default({
    pattern: ['./*.css', './**/*.css'],
    cwd: '.',
  })
  .alias('p', 'pattern')
  .alias('c', 'cwd')
  .alias('h', 'help')
  .argv;

const {pattern: glob, cwd} = argv;
const watcher = new Watcher({glob, cwd});

watcher.on('error', (err: Error) => {
  console.error('🔴 Error: ', err);
});

watcher.on('update', (originalFilepath: string, dtsPath: string) => {
  console.error(`✅ Created new dtsFile for ${originalFilepath} ➡️ ${dtsPath}`);
});

watcher.on('delete', (originalFilepath: string, dtsPath: string) => {
  console.error(`🔥 Removed ${originalFilepath} ➡️ ${dtsPath}`);
});

watcher.watch();

