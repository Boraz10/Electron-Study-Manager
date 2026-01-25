var button = document.getElementById('bodyButton');
var textArea = document.getElementById('textArea');
console.log("Script loaded.");
// Push button
button.addEventListener('click', function () {
    textArea.textContent = "Button Clicked!";
    textArea.style.color = "blue";
});
