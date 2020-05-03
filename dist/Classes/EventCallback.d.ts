export declare class EventCallback {
    protected key: string;
    protected callbacks: Array<Function>;
    protected callbacksIndex: Object;
    constructor(key: string);
    run(args?: Array<any>): EventCallback;
    addCallback(callback: Function, callbackId: number): EventCallback;
    removeEvent(callbackId: number): EventCallback;
}
