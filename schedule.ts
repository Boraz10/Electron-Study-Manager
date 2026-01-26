import { Item } from "./item";


export class Schedule {
    #tasks: Item[] = [];
    #currentTaskIndex: number = 0;
    #totalSeconds: number = 0;
    #secondsRemaining: number = 0;

    constructor() {
        
    }

    addTask(task: Item): void {
        this.#tasks.push(task);
    }
}