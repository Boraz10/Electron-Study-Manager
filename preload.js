const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload loaded');

contextBridge.exposeInMainWorld('scheduleAPI', {
    getSchedule: () => ipcRenderer.invoke('get-schedule'),
    saveSchedule: (schedule) => ipcRenderer.invoke('save-schedule', schedule),
    addItem: (schedule) => ipcRenderer.invoke('add-item', schedule),
    popSchedule: () => ipcRenderer.invoke('remove-last-item')
});