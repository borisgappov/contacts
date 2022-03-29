declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      },
      ipcRenderer: {
        myPing(): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on(channel: string, func: (...args: any[]) => void): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        once(channel: string, func: (...args: any[]) => void): void;
      }
    };
  }
}

export {};
