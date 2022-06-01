export class EventCallback {

    protected key: string;

    protected callbacks: Array<Function> = [];

    protected callbacksIndex: {[key: number]: number} = {};

    public constructor(key: string)
    {
        this.key = key;
    }

    public run(args: Array<any> = []): EventCallback
    {
        this.callbacks.forEach((callback) => {
            callback.apply(this, args);
        });

        return this;
    }

    public addCallback(callback: Function, callbackId: number): EventCallback
    {
        this.callbacksIndex[callbackId] = this.callbacks.push(callback) - 1;

        return this;
    }

    public removeCallback(callbackId: number): EventCallback
    {
        let index = this.callbacksIndex[callbackId];

        if (typeof index !== 'undefined' && index > -1) {
            this.callbacks.splice(index, 1);
        }

        delete this.callbacksIndex[callbackId];

        return this;
    }

}
