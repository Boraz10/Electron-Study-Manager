const itemForm = document.getElementById('itemForm') as HTMLFormElement;


console.log("Script loaded.");



// set the font based on settings
const currentFont = window.settingsAPI.getSettings('font') as string;

document.documentElement.style.setProperty('--app-font', currentFont);

// TODO: Set sound settings based on settings

updateBackground();

import { Schedule } from './schedule.js';

const schedule = new Schedule();



// update bacxkground based on page
 //update bacground based on time of day
function updateBackground() {
    const now = new Date();
    const hour = now.getHours();

        let bgImage : string = "";
        let bgColor : string = "";
        if          (hour < 9 && hour >= 5) {
            bgImage = "url('../Assets/bg_dawn.gif')";
            bgColor = "#FFDAB9";
        } else if   (hour < 16) {
            bgImage = "url('../Assets/bg_day.gif')";
            bgColor = "#87CEEB";
        } else if   (hour < 21 || hour < 5) {
            bgImage = "url('../Assets/bg_dusk.gif')";
            bgColor = "#FFA07A";
        }  else {
            bgImage = "url('../Assets/bg_night.gif')";
            bgColor = "#2F4F4F";
        }

        document.body.style.backgroundImage = bgImage;
        document.body.style.backgroundColor = bgColor;
}

// Push button
itemForm.addEventListener('submit', () => { 
    schedule.addItem( itemForm )
    schedule.renderSchedule();
});

