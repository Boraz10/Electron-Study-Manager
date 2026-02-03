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

};

updateTime();

setInterval(updateTime, 1000);

