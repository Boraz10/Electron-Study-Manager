export class Item {
    #taskName: string = "";
    #totalSeconds: number = 0;
    #secondsRemaining: number = 0;
    #status: boolean = false;

    constructor(taskName: string, totalSeconds: number) {
        this.#taskName = taskName;
        this.#totalSeconds = totalSeconds;
        this.#secondsRemaining = totalSeconds;
    }

    set status(status: boolean) {
        this.#status = status;
    }

    get status(): boolean {
        return this.#status;
    }

    get taskName(): string {
        return this.#taskName;
    }

    get totalSeconds(): number {
        return this.#totalSeconds;
    }

    printTimeLeft(): void {
        let seconds: number = this.#secondsRemaining / 60;
        let minutes: number = this.#secondsRemaining % 60;
        console.log(`Time Left: ${seconds}m ${minutes}s`);
    }


}