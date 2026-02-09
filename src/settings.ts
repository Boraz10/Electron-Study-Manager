// Get the current settings from the main proce)
const currentUsername = window.settingsAPI.getSettings('username') as string;
const currentFont = window.settingsAPI.getSettings('font') as string;
const currentSoundEnabled = window.settingsAPI.getSettings('soundEnabled') as boolean;
const currentNotificationsEnabled = window.settingsAPI.getSettings('notificationsEnabled') as boolean;


const usernameInput = document.getElementById('usernameSelect') as HTMLInputElement;
usernameInput.value = currentUsername;

const fontSelect = document.getElementById('fontSelect') as HTMLSelectElement;
fontSelect.value = currentFont;

const soundEnabledCheckbox = document.getElementById('enableSound') as HTMLInputElement;
soundEnabledCheckbox.checked = currentSoundEnabled;

const notificationsEnabledCheckbox = document.getElementById('enableDesktopNotifications') as HTMLInputElement;
notificationsEnabledCheckbox.checked = currentNotificationsEnabled;


// Save the settings when the user clicks the save button
const saveButton = document.getElementById('saveSettings') as HTMLButtonElement;
saveButton.addEventListener('click', () => { 
    window.settingsAPI.setSettings('username', usernameInput.value);
    window.settingsAPI.setSettings('font', fontSelect.value);
    window.settingsAPI.setSettings('soundEnabled', soundEnabledCheckbox.checked);
    window.settingsAPI.setSettings('notificationsEnabled', notificationsEnabledCheckbox.checked);
});