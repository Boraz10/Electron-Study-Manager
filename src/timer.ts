// Handle the study timer code

//1/02/2026
//TODO: There is a missmatch between total time and the timer for rach of the tasks. Fix.

console.log("timer loaded");

import { Item } from "./item";
import { easyProjects, mediumProjects, hardProjects } from "./tasks.js";

let totalTimeRemaining = 0 as number;
let totalSecondsRemaining = 0 as number;
let currentTaskSeconds = 0 as number;
let currentTaskName = "" as string;

let skipCurrentTask = false;

const nextButton = document.getElementById("nextTask") as HTMLButtonElement;

nextButton.addEventListener('click', () => {
    skipCurrentTask = true;
});

// Function to start the total countdown and handle current task
function startTotalCountdown() {
    const interval = setInterval(() => {
        if (totalSecondsRemaining <= 0) {
            clearInterval(interval);
            console.log("total time is up");
            return;
        }

        totalSecondsRemaining--;

        // Decrement current task if active
        if (currentTaskSeconds > 0 && !skipCurrentTask) {
            currentTaskSeconds--;
        }

        // Update total time display
        const hours = Math.floor(totalSecondsRemaining / 3600) as number;
        const minutes = Math.floor((totalSecondsRemaining % 3600) / 60) as number;
        const seconds = totalSecondsRemaining % 60 as number;

        let totalElement = document.getElementById("totalTimeLeft") as HTMLElement;
        if (totalElement) {
            totalElement.innerText = (
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
            );
        }

        // Update current task display
        if (currentTaskSeconds > 0) {
            const cHours = Math.floor(currentTaskSeconds / 3600) as number;
            const cMinutes = Math.floor((currentTaskSeconds % 3600) / 60) as number;
            const cSeconds = currentTaskSeconds % 60 as number;

            let currentElement = document.getElementById("currentTimeLeft") as HTMLElement;
            if (currentElement) {
                currentElement.innerText = (
                `${String(cHours).padStart(2, "0")}:` +
                `${String(cMinutes).padStart(2, "0")}:` +
                `${String(cSeconds).padStart(2, "0")}`
                );
            }
        }

        // Check if current task is done
        if (currentTaskSeconds <= 0 && currentTaskName !== "") {
            // Task completed, will be handled by the promise
        }
    }, 1000);
}


// Access the schedule
async function processSchedule() {
    const schedule: Item[] = await window.scheduleAPI.getSchedule();

    if (schedule.length === 0) {
        console.log("No items in schedule.");
        let innerElement = document.getElementById("timerDisplay") as HTMLElement;
        if (innerElement) {
            innerElement.innerHTML = "<h3>No items in schedule.</h3>";
        }
        return;
    }

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
            currentTaskName = schedule[i]?.title ?? "noName";
            currentTaskSeconds = Math.floor(currentDuration * 60);
            const nameElement = document.getElementById("currentTask");
            if (nameElement) {
                nameElement.innerText = currentTaskName;

                // if the task is a small project, display a random task to do while working on it
                const randomElement = document.getElementById("randomTaskDisplay");
                if (currentTaskName.toLowerCase() === "small project") {
                    const randomTask = pickRandomTask();
                    if (randomElement) {
                        randomElement.innerText = `Today's task: ${randomTask}`;
                    }
                }
                else {
                    if (randomElement) randomElement.innerText = '';
                }
            }

            // Wait for the task to complete
            await new Promise<void>((resolve) => {
                const checkComplete = () => {
                    if (currentTaskSeconds <= 0 || skipCurrentTask) {
                        if (skipCurrentTask) {
                            totalSecondsRemaining -= currentTaskSeconds;
                            if (totalSecondsRemaining < 0) totalSecondsRemaining = 0;
                            skipCurrentTask = false;
                        }
                        currentTaskSeconds = 0;
                        resolve();
                    } else {
                        setTimeout(checkComplete, 100); // Check every 100ms
                    }
                };
                checkComplete();
            });
        }
    }
    console.log("time completely up");
    let innerElement = document.getElementById("timerDisplay") as HTMLElement;
        if (innerElement) {
            innerElement.innerHTML = "<h3 id='congrats'>All done! Good Job. </h3> <br> <a href='index.html'><button class='mediumButton' id='returnToMenu'>To menu</button></a>";
        }
}

function pickRandomTask() {
    let difficulty = Math.random() * (100 - 1) + 1;

    if (difficulty <= 50) {
        // Easy task
        const randomIndex = Math.floor(Math.random() * easyProjects.length);
        return easyProjects[randomIndex];
    } else if (difficulty <= 80) {
        // Medium task
        const randomIndex = Math.floor(Math.random() * mediumProjects.length);
        return mediumProjects[randomIndex];
    } else {
        // Hard task
        const randomIndex = Math.floor(Math.random() * hardProjects.length);
        return hardProjects[randomIndex];
    }
}


processSchedule();



// Calculate the current task and how much time it has left

// Handle counting down