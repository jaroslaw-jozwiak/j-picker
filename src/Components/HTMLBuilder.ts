import {HTMLEvent} from "../Interface/HTMLEvent";

export class HTMLBuilder {

    protected HTMLElement: HTMLElement = null;

    protected mustachePath: string;

    protected mustacheVars: Object = {};

    protected mustacheRequireCallback: any;

    protected events: Array<HTMLEvent> = [];

    public getHTMLElement(): HTMLElement {
        if (this.HTMLElement === null) {
            this.prepareElement();
        }
        this.prepareEvents();

        return this.HTMLElement;
    }

    public setMustachePath(mustachePath: string): HTMLBuilder {
        this.mustachePath = mustachePath;

        return this;
    }

    public setMustacheVars(mustacheVars: Object): HTMLBuilder {
        this.mustacheVars = mustacheVars;

        return this;
    }

    public addEvent(selector: string, type: string, callback: Function): HTMLBuilder {
        return this.addEventObject({
            selector: selector,
            type: type,
            callback: callback
        });
    }

    public addEventObject(event: HTMLEvent): HTMLBuilder {
        this.events.push(event);

        return this;
    }

    public setEvents(events: Array<HTMLEvent>): HTMLBuilder {
        this.events = events;

        return this;
    }

    public setMustache(requireCallback: any): HTMLBuilder {
        this.mustacheRequireCallback = requireCallback;

        return this;
    }

    protected prepareElement(): HTMLBuilder {
        let parent = document.createElement('div');

        parent.innerHTML = this.getHTMLFromMustache();
        this.HTMLElement = <HTMLElement>parent.firstChild;

        return this;
    }

    protected prepareEvents(): HTMLBuilder {
        this.events.forEach((event: HTMLEvent) => {
            let elements;

            if (event.selector === 'this') {
                elements = [this.HTMLElement];
            } else {
                elements = this.HTMLElement.querySelectorAll(event.selector);
            }

            elements.forEach(Element => {
                Element.addEventListener(event.type, event.callback);
            });
        });

        this.events = [];

        return this;
    }

    protected getHTMLFromMustache(): string {
        return this.mustacheRequireCallback(this.mustacheVars);
    }

}
