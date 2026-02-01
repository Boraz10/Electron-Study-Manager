//28/01/2026

import { clear } from "node:console";
import { Item } from "./item";
// import * as fs from "fs";

// const filePath = "schedule.json";
const scheduleUl = document.getElementById("scheduleList") as HTMLUListElement;

let draggedIndex: number | null = null;
let hoverIndex: number | null = null;
let indicator: HTMLDivElement | null = null;

let schedule: Item[] = [];
let binOpen = false as boolean;
const bin = document.getElementById("binElement") as HTMLDivElement;



export class Schedule {
    #currentTaskIndex: number = 0;
    #totalDuration: number = 0;

    constructor() {
        console.log("Schedule loaded.");
        this.loadSchedule();
        this.handleBin();
    }

    addItem(itemForm: HTMLFormElement) :  void {
        let newItem: Item = {
            index: schedule.length || 0,
            title: itemForm.taskName.value || "Null",
            duration: itemForm.taskDuration.value || 0
        }
    window.scheduleAPI.addItem(newItem).then(() => {
        console.log("New item added:", newItem);
        this.loadSchedule();
    }).catch((error: any) => {
        console.error("Error adding item:", error);
    });
    }


    removeItem(index: Number) : void {
        window.scheduleAPI.removeItem(index).then(() => {
        console.log("Last item removed.");
        
        this.loadSchedule();
    }).catch((error: any) => {
        console.error("Error removing last item:", error);
    });
    }

    printSchedule(): void {
        for (let i = 0; i < schedule.length; i++) {
            const item = schedule[i];
            if (item) {
                console.log(`Item ${item.index}: Title: ${item.title}, Duration: ${item.duration} minutes`);
            }
        }
        console.log(`Total duration: ${this.#totalDuration}`);
    }

    renderSchedule() : void {
        scheduleUl.innerHTML = "";

        schedule.forEach((item, index) => {
            item.index = index;

            const li = document.createElement("li");
            li.draggable = true;
            li.dataset.index = index.toString();

            const span = document.createElement("span");
            span.textContent = `${item.title} (${item.duration} min)`;

            const controls = document.createElement("div");

            const upBtn = document.createElement("button");
            upBtn.classList.add("up");
            upBtn.textContent = "▲";

            const downBtn = document.createElement("button");
            downBtn.classList.add("down");
            downBtn.textContent = "▼";

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "×";

            controls.append(upBtn, downBtn, deleteBtn);
            li.append(span, controls);

            this.attachButtonHandlers(li, index);
            this.attachDragHandlers(li);

            scheduleUl.appendChild(li);

        });
    }

    attachButtonHandlers(li: HTMLLIElement, index: number) : void {
        li.querySelector(".up")?.addEventListener("click", () => {
            this.moveTask(index, index - 1);
        })

         li.querySelector(".down")?.addEventListener("click", () => {
            this.moveTask(index, index + 1);
        })
        li.querySelector(".delete")?.addEventListener("click", () => {
            this.removeItem(index);
        })
    }

    async moveTask(from: number, to: number)  {
        if (to < 0 || to >= schedule.length) return;

        const prevPositions = this.getPositions();

        const [moved] = schedule.splice(from, 1);

        if (moved) {
            schedule.splice(to, 0, moved);
        }

        await this.saveSchedule();
        this.renderSchedule();

        requestAnimationFrame(() => {
            this.animateReorder(prevPositions);
        });
    }

    attachDragHandlers(li: HTMLLIElement) {
        li.addEventListener("dragstart", (e) => {
            draggedIndex = Number(li.dataset.index);
            li.classList.add("dragging");
            li.style.cursor = 'grab';

            // let offset

            // e.dataTransfer?.setDragImage(li, 0, 0);
        });

        li.addEventListener("dragend", () => {
            draggedIndex = null;
            li.classList.remove("dragging");
            this.clearIndicator();
            binOpen = false;
        });

        li.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (draggedIndex == null) return;

            const targetIndex = Number(li.dataset.index);
            const rect = li.getBoundingClientRect();
            const before = e.clientY < rect.top + rect.height / 2;

            hoverIndex = before ? targetIndex : targetIndex + 1;

            this.showIndicator(hoverIndex);
           
        });

        li.addEventListener("drop", async () => {
            if (draggedIndex == null || hoverIndex == null) return;

            const from = draggedIndex;
            let to = hoverIndex;

            // removing the item first
            if (to > from) to--;

            await this.moveTask(from, to);
            this.clearIndicator();
            // else {   
            //     const targetIndex = Number(li.dataset.index)
            //     this.moveTask(draggedIndex, targetIndex);
            //     }

        });

        
    }

    async loadSchedule() {
        schedule = await window.scheduleAPI.getSchedule();
        this.renderSchedule();
    }

    async saveSchedule() {
        await window.scheduleAPI.saveSchedule(schedule);
    }

    async handleBin() {
          bin.addEventListener("dragover", (e) => {
                    e.preventDefault();
                    binOpen = true;
                    bin.classList.add("open");
                });

        bin.addEventListener("dragleave", () => {
            binOpen = false;
            bin.classList.remove("open");
        });

        bin.addEventListener("drop", async () => {
            if (draggedIndex == null) return;

            this.removeItem(draggedIndex);
            this.renderSchedule();

            draggedIndex = null;
            binOpen = false;
            bin.classList.remove("open");
        });

    }

    showIndicator(index: number) {
        if (!indicator) {
            indicator = document.createElement("div");
            indicator.className = "drop-indicator";
        }

        const children = Array.from(scheduleUl.children);

        if (index >= children.length) {
            scheduleUl.appendChild(indicator);
        }
        else {
            const targetChild = children[index];
            if (targetChild) {
                scheduleUl.insertBefore(indicator, targetChild);
            }
        }
    }

    clearIndicator() {
        indicator?.remove();
        indicator = null;
        hoverIndex = null;
    }

    getPositions(): Map<Element, DOMRect> {
        const map = new Map<Element, DOMRect>();

        [...scheduleUl.children].forEach(el => {
            map.set(el, el.getBoundingClientRect())
        });

        return map;
    }

    animateReorder(prev: Map<Element, DOMRect>) {
        [...scheduleUl.children].forEach(el => {
            const oldRect = prev.get(el);
            if (!oldRect) return;

            const newRect = el.getBoundingClientRect();
            const dx = oldRect.left - newRect.left;
            const dy = oldRect.top - newRect.top;

            if (dx || dy) {
                el.animate(
                    [
                        { transform: `translate(${dx}px, ${dy}px)` },
                        { transform: 'translate(0, 0)' }
                    ],
                    {
                        duration: 180,
                        easing: "ease-out"
                    }
                ); 
            }
        });
    }

 
}

