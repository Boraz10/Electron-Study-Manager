const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const Store = require('electron-store').default;
// const fs = require('fs');
// const path = require('path');

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
  win = new BrowserWindow({
    width: 480,
    height: 640,
    frame: false,
    resizable: false,
    transparent: true,
  //  // titleBarStyle: 'hidden',
   autoHideMenuBar: true,
     ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

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
 
  createWindow();

  app.on('activate', () => {
    // If there are no open windows, create a new one (macOS behavior)
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit() // Basically end the task when all windows are closed if the platform is not macOS
});



