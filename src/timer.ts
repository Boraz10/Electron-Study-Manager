// Handle the study timer code

//1/02/2026
//TODO: There is a missmatch between total time and the timer for rach of the tasks. Fix.

console.log("timer loaded");

import { Item } from "./item";

let totalTimeRemaining = 0 as number;
let totalSecondsRemaining = 0 as number;

let skipCurrentTask = false;

const nextButton = document.getElementById("nextTask") as HTMLButtonElement;

nextButton.addEventListener('click', () => {
    skipCurrentTask = true;
});

// Function to start the total countdown
function startTotalCountdown() {
    const interval = setInterval(() => {
        if (totalSecondsRemaining <= 0) {
            clearInterval(interval);
            console.log("total time is up");
            return;
        }

        totalSecondsRemaining--;

        const hours = Math.floor(totalSecondsRemaining / 3600) as number;
        const minutes = Math.floor((totalSecondsRemaining % 3600) / 60) as number;
        const seconds = totalSecondsRemaining % 60 as number;

        let innerElement = document.getElementById("totalTimeLeft") as HTMLElement;
        if (innerElement) {
            innerElement.innerText = (
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
            );
        }
    }, 1000);
}


// Access the schedule
async function processSchedule() {
    const schedule: Item[] = await window.scheduleAPI.getSchedule();

    //console.log(schedule);

    // Calculate the total time
    for (let i = 0; i < schedule.length; i++) {
        //console.log(`index: ${i}`);
        if (schedule[i]?.duration) {
            let currentDuration = +(schedule[i]?.duration ?? 0) as number;
            totalTimeRemaining += currentDuration;
        }
    }
    totalSecondsRemaining = Math.floor(totalTimeRemaining * 60);
    console.log(totalTimeRemaining);

    // Start total countdown
    startTotalCountdown();

    // Process tasks sequentially
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i]?.duration) {
            let currentDuration = +(schedule[i]?.duration ?? 0) as number;
            let currentTaskName = schedule[i]?.title ?? "noName";
            const nameElement = document.getElementById("currentTask");
            if (nameElement) {
                nameElement.innerText = currentTaskName;
            }

            await countdown(currentDuration, "currentTimeLeft");
        }
    }
    console.log("time completely up");
    // TODO: Here I would put my code to handle what happens when the timer is up
}

function countdown(totalMinutes : number, htmlID : string): Promise<void> {
    return new Promise((resolve) => {
        skipCurrentTask = false;
        let totalSeconds = Math.floor(totalMinutes * 60) + 1 as number;

        const interval = setInterval(() => {
            if (skipCurrentTask) {
                clearInterval(interval);
                // Subtract the remaining time from total
                totalSecondsRemaining -= totalSeconds;
                if (totalSecondsRemaining < 0) totalSecondsRemaining = 0;
                resolve();
                return;
            }

            if (totalSeconds <= 0) {
                clearInterval(interval);
                resolve();
                return;
            }

            totalSeconds--;

            const hours = Math.floor(totalSeconds / 3600) as number;
            const minutes = Math.floor((totalSeconds % 3600) / 60) as number;
            const seconds = totalSeconds % 60 as number;

            let innerElement = document.getElementById(htmlID) as HTMLElement;
            if (innerElement) {
                innerElement.innerText = (
                `${String(hours).padStart(2, "0")}:` +
                `${String(minutes).padStart(2, "0")}:` +
                `${String(seconds).padStart(2, "0")}`
                );
            }
        }, 1000 );
    });
}

processSchedule();



// Calculate the current task and how much time it has left

// Handle counting down