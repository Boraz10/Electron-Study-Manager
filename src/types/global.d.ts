export {};

declare global {
  interface Window {
    scheduleAPI: {
      getSchedule: () => Promise<any>;
      saveSchedule: (schedule: any) => Promise<any>;
      addItem: (item: any) => Promise<any>;
      removeItem: (index: Number) => Promise<any>;
    };
  }
}