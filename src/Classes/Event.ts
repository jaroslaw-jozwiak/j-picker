import {EventCallback} from "./EventCallback";
import {JPicker} from "../Components/JPicker/JPicker";
import {Tools} from "./Tools";

export class Event {
    private static Instance: Event = null;

    protected events = {};

    protected callbacksIdsSet = {};

    protected callbackId = 1;

    protected JPickerI: JPicker = null;

    private constructor() { }

    public static get(): Event
    {
        if (Event.Instance === null) {
            Event.Instance = new Event;
        }

        return Event.Instance;
    }

    public setJPicker(JPickerI: JPicker): Event
    {
        this.JPickerI = JPickerI;

        return this;
    }

    public addListener(key: string, callback: Function): number
    {
        let currentCallbackId = this.callbackId;

        this.callbackId++;

        if (typeof this.events[key] === 'undefined') {
            this.events[key] = new EventCallback(key);
        }

        this.events[key].addCallback(callback, currentCallbackId);
        this.callbacksIdsSet[currentCallbackId] = key;

        return currentCallbackId;
    }

    public removeListener(callbackId: number): Event
    {
        let key = this.callbacksIdsSet[callbackId] || '';

        if (typeof this.events[key] !== 'undefined') {
            this.events[key].removeCallback(callbackId);
        }

        return this;
    }

    public trigger(key: string, ...args: any): Event
    {
        if (Tools.d(this.events[key])) {
            (<EventCallback>this.events[key]).run(args);
        }

        return this;
    }

}
