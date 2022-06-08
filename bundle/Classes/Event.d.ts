export declare class Event {
    private static Instance;
    protected events: {};
    protected callbacksIdsSet: {};
    protected callbackId: number;
    addListener(key: string, callback: Function): number;
    removeListener(callbackId: number): Event;
    trigger(key: string, ...args: any): Event;
}
