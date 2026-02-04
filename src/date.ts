const currentDate = document.getElementById('currentDate') as HTMLParagraphElement;
const currentTime = document.getElementById('currentTime') as HTMLParagraphElement;

// const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };



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
        greeting = "Good morning, user!";
    } else if (hour < 18) {
        greeting = "Good afternoon, user!";
    } else {
        greeting = "Good evening, user!";
    }

    greetingElement.innerText = greeting;

};


updateTime();

setInterval(updateTime, 1000);

