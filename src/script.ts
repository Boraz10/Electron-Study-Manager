var showButton = document.getElementById('bodyButton') as HTMLButtonElement;
var addButton = document.getElementById('addButton') as HTMLButtonElement;
var removeButton = document.getElementById('removeButton') as HTMLButtonElement;
const itemForm = document.getElementById('itemForm') as HTMLFormElement;


console.log("Script loaded.");

import { Schedule } from './schedule.js';

const schedule = new Schedule();



// Push button
showButton.addEventListener('click', () => {
    schedule.getSchedule()
});

itemForm.addEventListener('submit', () => { 
    schedule.addItem( itemForm )
});

removeButton.addEventListener('click', () => {
    schedule.removeItem()
});
