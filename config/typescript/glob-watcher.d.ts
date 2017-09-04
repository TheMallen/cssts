/* TODO contribute this to DefinitelyTyped */
declare module 'glob-watcher' {
  type Globs = string[];
  type Event = 'add' | 'change' | 'unlink';

  interface Options {
    ignoreInitial?: boolean,
    queue?: boolean,
    delay?: number,
    events?: Event[],
  }

  interface EventCallback {
    (path: string, stat: string): void,
  }

  interface WatchCallback {
    (done: () => void): void | Promise<any>,
  }

  interface Watcher {
    on(event: Event, callback: EventCallback): void,
  }

  interface WatchFunction {
    (globs: Globs, optionsOrCallback?: WatchCallback | Options, callback?: WatchCallback): Watcher,
  }

  const WatchFunction: WatchFunction;
  export = WatchFunction;
}
