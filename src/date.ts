const currentDate = document.getElementById('currentDate') as HTMLParagraphElement;
const currentTime = document.getElementById('currentTime') as HTMLParagraphElement;

// const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };

// Set the username based on settings
const username = window.settingsAPI.getSettings('username') as string;

function updateTime() {
    const now = new Date();

    // const formattedDate = now.toLocaleDateString();
    var formattedTime = now.toLocaleTimeString();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    currentDate!.innerText = `Today is ${formattedDate}`;
    currentTime!.innerText = `Current time is ${formattedTime}`;

    // Update greeting based on time of day
    const greetingElement = document.getElementById('greeting') as HTMLElement;
    const hour = now.getHours();
    let greeting = "Hello";

    if (hour < 12) {
        greeting = `Good morning,  ${username}!`;
    } else if (hour < 18) {
        greeting = `Good afternoon,  ${username}!`;
    } else {
        greeting = `Good evening,  ${username}!`;
    }

    greetingElement.innerText = greeting;

};


updateTime();

setInterval(updateTime, 1000);

