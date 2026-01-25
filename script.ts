const button = document.getElementById('bodyButton') as HTMLButtonElement;
const textArea = document.getElementById('textArea') as HTMLParagraphElement;

console.log("Script loaded.");

// Push button
button.addEventListener('click', () => {
    textArea.textContent = "Button Clicked!";
    textArea.style.color = "blue";
});