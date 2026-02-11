const { app, BrowserWindow, ipcMain, shell, session, nativeImage } = require('electron/main');
const path = require('node:path');
const Store = require('electron-store').default;
// const fs = require('fs');
// const path = require('path');

if (process.platform === 'win32') {
  app.setAppUserModelId("Electron Study Manager");
}


// TODO: See if you can split the store into multiple, one for settings one for schedule
 const store = new Store({
  defaults: {
    schedule: [],
    username: 'User',
    font: 'Pixelify Sans',
    soundEnabled: true,
    notificationsEnabled: false
  }
 });

 let win;


const createWindow = () => {
  // Icon
  const iconPath = path.join(__dirname, './Assets/Icons/icon.ico');
  const iconImage = nativeImage.createFromPath(iconPath);
  win = new BrowserWindow({
    width: 480,
    height: 640,
    icon: iconImage,

    frame: false,
    resizable: false,
    transparent: true,
  //  // titleBarStyle: 'hidden',
   autoHideMenuBar: true,
     ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false,
    }
  })

   win.webContents.setWindowOpenHandler((details) => {
    // Check if the URL is an external website
    if (details.url.startsWith('http:') || details.url.startsWith('https:')) {
      shell.openExternal(details.url); // Open URL in user's browser
    }
    return { action: 'deny' }; // Prevent the app from opening the URL internally
  });

  win.webContents.on('did-finish-load', () => {
    win.show();
    win.webContents.send('message', 'Hello renderer process!');
  });


  win.loadFile('index.html')
}

 //IPC Handlers
  ipcMain.handle('get-schedule', () => {
    return store.get('schedule');
  });

  ipcMain.handle('save-schedule', (_, schedules) => {
    store.set('schedule', schedules);
  });

  ipcMain.handle('add-item', (_, item) => {
    const schedule = store.get('schedule') || [];
    schedule.push(item);
    store.set('schedule', schedule);
  });

  ipcMain.handle('remove-item', (_, index) => {
    const schedule = store.get('schedule') || [];
    schedule.splice(index, 1);
    store.set('schedule', schedule);
  });

  //Minimize and Close window handlers
  ipcMain.on('minimize-window', () => {
    if (win) {
      win.minimize();
    }
  });

  ipcMain.on('close-window', () => {
    if (win) {
      win.close();
    }
  });

 // Set and get settings handlers
 ipcMain.on('get-settings', (event, key) => {
  const value = store.get(key);
  event.returnValue = value;
 });

 ipcMain.on('set-settings', (event, key, value) => {
  store.set(key, value);
  event.returnValue = true;
 });


app.whenReady().then(() => {

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self';"]
      }
    });
  });
 
  createWindow();

  app.on('activate', () => {
    // If there are no open windows, create a new one (macOS behavior)
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit() // Basically end the task when all windows are closed if the platform is not macOS
});





