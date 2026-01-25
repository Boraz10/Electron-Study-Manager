const { app, BrowserWindow } = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // If there are no open windows, create a new one (macOS behavior)
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit() // Basically end the task when all windows are closed if the platform is not macOS
})