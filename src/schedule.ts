import { Item } from "./item";


export class Schedule {
    #tasks: Item[] = [];
    #currentTaskIndex: number = 0;
    #totalSeconds: number = 0;
    #secondsRemaining: number = 0;

    constructor() {
        console.log("Schedule loaded.");
        
    }

    // addTask(task: Item): void {
    //     this.#tasks.push(task);
    // }

    getSchedule() : void {
        var textArea = document.getElementById('textArea') as HTMLParagraphElement;
        textArea.align = "center";
            textArea.style.color = "blue";

        window.scheduleAPI.getSchedule().then((schedule: any) => {
            console.log("Schedule:", schedule);
            // You can update the textArea with the schedules if needed
            textArea.textContent = "\nSchedule: " + JSON.stringify(schedule);
    }).catch((error: any) => {
        console.error("Error retrieving schedule:", error);
    });
    }

    addItem(itemForm: HTMLFormElement) :  void {
        const newItem = {  
            title: itemForm.taskName.value || "Untitled Task",
            //date: new Date().toISOString(),
            duration: itemForm.taskDuration.value || 0 // duration in minutes
        };
    window.scheduleAPI.addItem(newItem).then(() => {
        console.log("New item added:", newItem);
        //textArea.textContent += "\nAdded Item: " + JSON.stringify(newItem);
    }).catch((error: any) => {
        console.error("Error adding item:", error);
    });
    }


    removeItem() : void {
        window.scheduleAPI.popSchedule().then(() => {
        console.log("Last item removed.");
        //textArea.textContent += "\nRemoved last schedule.";
    }).catch((error: any) => {
        console.error("Error removing last item:", error);
    });
    }


}