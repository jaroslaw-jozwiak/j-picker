import { JPicker } from "../Components/JPicker/JPicker";
export declare class Event {
    private static Instance;
    protected events: {};
    protected callbacksIdsSet: {};
    protected callbackId: number;
    protected JPickerI: JPicker;
    private constructor();
    static get(): Event;
    setJPicker(JPickerI: JPicker): Event;
    addListener(key: string, callback: Function): number;
    removeListener(callbackId: number): Event;
    trigger(key: string, ...args: any): Event;
}
