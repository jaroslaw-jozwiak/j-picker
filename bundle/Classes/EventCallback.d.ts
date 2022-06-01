export declare class EventCallback {
    protected key: string;
    protected callbacks: Array<Function>;
    protected callbacksIndex: {
        [key: number]: number;
    };
    constructor(key: string);
    run(args?: Array<any>): EventCallback;
    addCallback(callback: Function, callbackId: number): EventCallback;
    removeCallback(callbackId: number): EventCallback;
}
