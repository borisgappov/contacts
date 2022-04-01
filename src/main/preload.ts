import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  data: {
    get(val: string) {
      return ipcRenderer.sendSync('electron-data-get', val);
    },
    // eslint-disable-next-line
    set(key: string, val: any) {
      ipcRenderer.send('electron-data-set', key, val);
    },
  },
});
