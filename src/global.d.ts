export {};

declare global {
  interface Window {
    api: {
      getAppVersion: () => Promise<string>;
      doSomething: (value: string) => Promise<string>;
    };
  }
}