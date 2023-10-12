import path from 'path';
import { app, BrowserWindow, dialog, shell, ipcMain, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { FileFilter, IpcEvent } from './preload';
import fetch from 'node-fetch-commonjs';
import fs from 'fs';
import { EventTypes } from '../Constants';

import { globalShortcut } from 'electron';
import { session } from 'electron';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// log.transports.file.level = "debug";

let shouldWitchFocus = true;
const focusUpdate = function() {
  shouldWitchFocus = false;
  setTimeout(() => {
    shouldWitchFocus = true;
  }, 1000);
};


let mainWindow: BrowserWindow | null = null;

let aspectIndex = 2;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug = true;

app.commandLine.appendSwitch('remote-debugging-port', '1234');
if (!isDebug) {
  app.on('browser-window-focus', function() {
    globalShortcut.register('CommandOrControl+R', () => {

    });
    globalShortcut.register('F5', () => {

    });
  });
  app.on('browser-window-blur', function() {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
  });
}

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


  ipcMain.on('ipc', (event: Electron.IpcMainEvent, args: IpcEvent) => {
    const type: EventTypes = args.type as EventTypes;
    console.log(`## [main]  |type:`, type);
  });

  ipcMain.handle('dialog', async (event, method, params): Promise<void> => {
    try {
      const result = await dialog.showOpenDialog(mainWindow!, {
        properties: ['openFile', 'openDirectory'],
        filters: [{
          name: 'svg',
          extensions: ['svg']
        }]
      });
      if (result.filePaths[0]) {
        const data = await fs.readFileSync(result.filePaths[0]);
        mainWindow?.webContents.send('file-open', result.filePaths[0], data);
      }
    } catch (e) {
      console.error(e);
      throw new Error(`Error class:main[] : we are fucked...!`);
    }
  });


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  new AppUpdater();
};


async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile', 'openDirectory'],
    filters: [{
      name: 'svg',
      extensions: ['svg']
    }]
  });
  if (canceled) {
    return filePaths[0];
  }

  if (filePaths[0]) {
    return await fs.readFileSync(filePaths[0]);
  }
}

function createMenu() {

  let menu = Menu.buildFromTemplate([{
    label: 'File',
    submenu: [{
      role: 'reload'
    }]
  },
    {
      label: 'File',
      submenu: [
        {
          label: 'load svg',
          click: async () => {
            try {
              const result = await dialog.showOpenDialog(mainWindow!, {
                properties: ['openFile', 'openDirectory'],
                filters: [{
                  name: 'svg',
                  extensions: ['svg']
                }]
              });
              if (result.filePaths[0]) {
                const data = await fs.readFileSync(result.filePaths[0]);
                mainWindow!.webContents.send('openSvg',data);
              }
            } catch (e) {
              console.error(e);
              throw new Error(`Error class:main[] : we are fucked...!`);
            }
          }
        },
        {
          label: 'open project',
          click: async () => {
            try {
              const result = await dialog.showOpenDialog(mainWindow!, {
                properties: ['openFile', 'openDirectory'],
                filters: [{
                  name: 'json',
                  extensions: ['json']
                }]
              });
              if (result.filePaths[0]) {
                const data = await fs.readFileSync(result.filePaths[0]);
                mainWindow!.webContents.send('openProject',data);
              }
            } catch (e) {
              console.error(e);
              throw new Error(`Error class:main[] : we are fucked...!`);
            }
          }
        },
        {
          label: 'save project',
          click: async () => {
            mainWindow!.webContents.send('saveProject');
          }
        }
      ]
    }]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(async () => {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('saveDataReturn', (event, projectFile:Record<string, any>)=>{
    console.log(`## [main] m | `);
    console.log(`## [main] saveDataReturn |`,typeof projectFile === 'object' ? Object.keys(projectFile) : {});
  })
  createWindow();
  let menu = new MenuBuilder(mainWindow!);
  menu.buildMenu();
  // createMenu();
});
