declare global {
  interface Window {
    electron: {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get: (key: string) => any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set: (key: string, val: any) => void;
      };
    };
  }
}

export {};
