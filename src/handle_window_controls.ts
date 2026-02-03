const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');

minimizeBtn?.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
});

closeBtn?.addEventListener('click', () => {
    window.electronAPI.closeWindow();
});