import path from 'path';
import { app, BrowserWindow, dialog, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { FileFilter, IpcEvent } from './preload';
import fetch from 'node-fetch-commonjs';
import fs from 'fs'
import { EventTypes } from '../Constants';

import { globalShortcut } from 'electron';
import { session } from 'electron'

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// log.transports.file.level = "debug";

let shouldWitchFocus = true;
const focusUpdate = function(){
  shouldWitchFocus = false;
  setTimeout(()=>{
    shouldWitchFocus = true;
  },1000);
}


interface Debuggable {
  devtoolsFrontendUrl: string;
  description: string;
  id: string;
  title: string;
  type: string;
  webSocketDebuggerUrl: string;
  url: string;
}

let mainWindow: BrowserWindow | null = null;
let debugView: BrowserWindow | null = null;
let emuView: BrowserWindow | null = null;
let emuViewTitle: string = '';

let aspectIndex = 2;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}


const isDebug = true;

// ipcMain.on('ipc', async (event, arg) => {
//   if (event.type === 'startServer') {
//     return server.start();
//   }
//   if (event.type === 'updateAspect') {
//     aspectIndex = arg.aspectIndex;
//     if (emuView) {
//
//     }
//   }
//
//   const msgTemplate = (pingPong: string) => `IPC test: ${event}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

app.commandLine.appendSwitch('remote-debugging-port', '1234');
if (!isDebug) {
  app.on('browser-window-focus', function() {
    globalShortcut.register('CommandOrControl+R', () => {
      if (debugView && debugView.isFocused()) {
        emuView?.reload();
      }
    });
    globalShortcut.register('F5', () => {
      if (debugView && debugView.isFocused()) {
        emuView?.reload();
      }
    });
  });
  app.on('browser-window-blur', function() {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
  });
}
const updateEmuView = () => {
  if (emuView) {
    let size = emuView.getContentSize();
    const width = size[0];
    if (width) {
      console.log(`## [main] updateEmuView | What is the aspectIndex:`, aspectIndex);
      switch (aspectIndex) {
        case 1: {
          emuView.setContentSize(width, Math.ceil(width / 4 * 3));
          break;
        }
        case 2: {
          emuView.setContentSize(width, Math.ceil(width / 16 * 9));
          break;
        }
        case 3: {
          emuView.setContentSize(width, Math.ceil(width / 21 * 9));
          break;
        }
      }
    }
  }
};
const createWindow = async () => {

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    resizable: isDebug,
    frame: true,
    width: isDebug ? 1120 : 560,
    height: 480,
    // titleBarStyle: 'customButtonsOnHover',
    focusable: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      // webSecurity:false,
      // allowRunningInsecureContent:true,
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js')
    }
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.on('ready-to-show', async () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
    if (isDebug) {
      mainWindow.webContents.openDevTools();
    }
  });

  const openDevtools = async (): Promise<boolean> => {
    if(debugView){
      debugView.focus();
      return false
    }
    const res = await fetch(`http://localhost:1234/json/list?t=${Date.now()}`);
    const debugPage = await res.json() as Array<Debuggable>;
    if (!debugPage.length) return false;
    for (let i in debugPage) {
      console.log(`## [main] openDevtools | `, debugPage[i].title);
      if (debugPage[i].title === emuViewTitle) {
        debugView = new BrowserWindow({
          show: true,
          icon: getAssetPath('icon.png')
        });
        debugView.loadURL('http://localhost:1234' + debugPage[i].devtoolsFrontendUrl);
        debugView.on('closed', () => {
          debugView = null;
        });
        debugView.on('focus', ()=>{
          if(emuView && shouldWitchFocus){
            focusUpdate();
            emuView.focus();
          }
        })
        return true;
      }
    }
    return false;
  };

  const openEmuView = async (receiverPath: string): Promise<void> => {
    emuView = new BrowserWindow({
      width: 1024,
      height: 576,
      show: false,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        webSecurity: false
      }
    });
    emuView.on('focus', ()=>{
      if(debugView && shouldWitchFocus){
        focusUpdate();
        debugView.focus();
      }
    })
    updateEmuView();
    emuView.webContents.on('did-finish-load', () => {
      const webContents = emuView?.webContents;
      if (webContents) {
        emuViewTitle = webContents.getTitle();
      }
      emuView?.show();
    });
    emuView.on('resize', (e: any) => {
      updateEmuView();
    });
    emuView.loadURL(receiverPath);
    emuView.on('closed', () => {
      emuView = null;
      if(debugView){
        debugView.close();
        return false
      }
    });
    app.on('browser-window-focus', function() {
      globalShortcut.register('CommandOrControl+R', () => {
        console.log('CommandOrControl+R is pressed: Shortcut Disabled');
      });
      globalShortcut.register('F5', () => {
        console.log('F5 is pressed: Shortcut Disabled');
      });
    });
  };

  ipcMain.on('ipc', (event: Electron.IpcMainEvent, args: IpcEvent) => {
    const type: EventTypes = args.type as EventTypes;
    console.log(`## [main]  |type:`, type);
    switch (type) {
      case EventTypes.OpenDevTools: {
        openDevtools();
        break;
      }
      case EventTypes.StartEmulator: {
        if (emuView) {
          console.log(`## [main] window is already open...`);
          return;
        }
        if (args.data && args.data.receiverPathApp) {
          openEmuView(args.data.receiverPathApp);
        }
        break;
      }
      case EventTypes.AspectChanged: {
        if (args.data && args.data.aspectIndex) {
          aspectIndex = args.data.aspectIndex;
          if (emuView) {
            updateEmuView();

          }
        }
        break;
      }
    }
  });
  // ipcMain.handle('dialog',async (fileType: FileFilter, cb: (data: Buffer) => void):Promise<void> => {
  //   try{
  //     const result = await dialog.showOpenDialog(mainWindow!, {
  //       properties: ['openFile', 'openDirectory'],
  //       filters: [{
  //         name: 'svg',
  //         extensions: ['svg']
  //       }]
  //     })
  //     if(result.filePaths[0]){
  //       const data = await fs.readFileSync(result.filePaths[0]);
  //       console.log(data);
  //     }
  //   }catch (e){
  //     console.error(e);
  //     throw new Error(`Error class:main[] : we are fucked...!`)
  //   }
  // });
  ipcMain.handle('dialog',async (event, method, params):Promise<void>=> {
    try{
      const result = await dialog.showOpenDialog(mainWindow!, {
        properties: ['openFile', 'openDirectory'],
        filters: [{
          name: 'svg',
          extensions: ['svg']
        }]
      })
      if(result.filePaths[0]){
        const data = await fs.readFileSync(result.filePaths[0]);
        mainWindow?.webContents.send('file-open', result.filePaths[0], data);
      }
    }catch (e){
      console.error(e);
      throw new Error(`Error class:main[] : we are fucked...!`)
    }
  });

  //


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  new AppUpdater();
};


async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile', 'openDirectory'],
    filters: [{
      name: 'svg',
      extensions: ['svg']
    }]
  })
  if (canceled) {
    return filePaths[0]
  }

  if(filePaths[0]){
    return await fs.readFileSync(filePaths[0]);
  }
}

app.whenReady().then(async () => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       'Content-Security-Policy': ['*']
  //     }
  //   })
  // })
  setTimeout(() => {
    createWindow();
  }, 2000);
  const res = await fetch(`http://localhost:1234/json/list?t=${Date.now()}`);
});
