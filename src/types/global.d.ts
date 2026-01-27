export {};

declare global {
  interface Window {
    scheduleAPI: {
      getSchedule: () => Promise<any>;
      saveSchedule: (schedule: any) => Promise<any>;
      addItem: (item: any) => Promise<any>;
      popSchedule: () => Promise<any>;
    };
  }
}