const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload loaded');

contextBridge.exposeInMainWorld('scheduleAPI', {
    getSchedule: () => ipcRenderer.invoke('get-schedule'),
    saveSchedule: (schedule) => ipcRenderer.invoke('save-schedule', schedule),
    addItem: (item) => ipcRenderer.invoke('add-item', item),
    removeItem: (index) => ipcRenderer.invoke('remove-item', index)
});

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window')
});

contextBridge.exposeInMainWorld('settingsAPI', {
  getSettings: (key) => ipcRenderer.sendSync('get-settings', key),
  setSettings: (key, value) => ipcRenderer.sendSync('set-settings', key, value)
});