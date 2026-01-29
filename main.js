const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const Store = require('electron-store').default;
// const fs = require('fs');
// const path = require('path');

 const store = new Store({
  defaults: {
    schedule: []
  }
 });


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

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



