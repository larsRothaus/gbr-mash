import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import { readdirSync } from 'fs';
import dialog = Electron.dialog;

export type Channels = 'ipc';

export interface IpcEvent {
  type: string,
  data?: any
}

export interface FileFilter {
  name: string;
  extensions: string[];
}

contextBridge.exposeInMainWorld('electron', {
  openDialog: (fileType: FileFilter, cb: (data: Buffer) => void) => ipcRenderer.invoke('dialog', method, config),
  ipcRenderer: {
    sendMessage(channel: Channels, args: IpcEvent) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (args: IpcEvent) => void) {
      const subscription = (_event: IpcRendererEvent, args: IpcEvent) => func(args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (args: IpcEvent) => void) {
      ipcRenderer.once(channel, (_event, args) => func(args));
    }
  }
});

