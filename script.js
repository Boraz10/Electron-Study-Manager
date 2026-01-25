const button = document.getElementById('bodyButton');
const textArea = document.getElementById('textArea');

console.log("Script loaded.");

// Push button
button.addEventListener('click', () => {
    textArea.textContent = "Button Clicked!";
});