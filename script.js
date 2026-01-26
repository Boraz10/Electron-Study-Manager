var showButton = document.getElementById('bodyButton');
var addButton = document.getElementById('addButton');
var removeButton = document.getElementById('removeButton');

const itemForm = document.getElementById('itemForm');

var textArea = document.getElementById('textArea');
console.log("Script loaded.");


// Push button
showButton.addEventListener('click', function () {
    //textArea.textContent = "Button Clicked!";
    textArea.style.color = "blue";
    schedule = window.scheduleAPI.getSchedule().then((schedule) => {
        console.log("Schedule:", schedule);
        // You can update the textArea with the schedules if needed
        textArea.textContent = "\nSchedule: " + JSON.stringify(schedule);
    }).catch((error) => {
        console.error("Error retrieving schedule:", error);
    });
});

itemForm.addEventListener('submit', function () {
    const newItem = {
        title: itemForm.taskName.value || "Untitled Task",
        //date: new Date().toISOString(),
        duration: itemForm.taskDuration.value || 0 // duration in minutes
    };
    window.scheduleAPI.addItem(newItem).then(() => {
        console.log("New item added:", newItem);
        //textArea.textContent += "\nAdded Item: " + JSON.stringify(newItem);
    }).catch((error) => {
        console.error("Error adding item:", error);
    });
});

removeButton.addEventListener('click', function () {
    window.scheduleAPI.popSchedule().then(() => {
        console.log("Last item removed.");
        //textArea.textContent += "\nRemoved last schedule.";
    }).catch((error) => {
        console.error("Error removing last item:", error);
    });
});
