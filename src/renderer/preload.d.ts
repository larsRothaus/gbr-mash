import { Channels } from 'main/preload';
import { IpcEvent } from '../main/preload';
import { ipcRenderer } from 'electron';

declare global {
  interface Window {
    electron: {
      //doStuff:(cb:(data:Buffer)=>void)=>void,
      openSvg: (cb: (event: any, data: Buffer) => void) => void,
      openProject: (cb: (event: any, data: any) => void) => void,
      updateProject: (projectFile: any) => void,
      saveProject: (cb: (event: any, data: any) => any) => void,
      openFile: () => any;
      openDialog: () => void;
      ipcRenderer: {
        sendMessage(channel: Channels, args: IpcEvent): void;
        on(
          channel: string,
          func: (args: IpcEvent) => void
        ): (() => void) | undefined;
        once(channel: string, func: (args: IpcEvent) => void): void;
      };
    };
  }
}

export {};
