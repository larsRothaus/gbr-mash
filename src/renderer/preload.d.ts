import { Channels } from 'main/preload';
import {IpcEvent} from '../main/preload'
declare global {
  interface Window {
    electron: {
      openDialog:(method: any, config: any)=>void;
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
