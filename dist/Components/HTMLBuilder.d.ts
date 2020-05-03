import { HTMLEvent } from "../Interface/HTMLEvent";
export declare class HTMLBuilder {
    protected HTMLElement: HTMLElement;
    protected mustachePath: string;
    protected mustacheVars: Object;
    protected mustacheRequireCallback: any;
    protected events: Array<HTMLEvent>;
    getHTMLElement(): HTMLElement;
    setMustachePath(mustachePath: string): HTMLBuilder;
    setMustacheVars(mustacheVars: Object): HTMLBuilder;
    addEvent(selector: string, type: string, callback: Function): HTMLBuilder;
    addEventObject(event: HTMLEvent): HTMLBuilder;
    setEvents(events: Array<HTMLEvent>): HTMLBuilder;
    setMustache(requireCallback: any): HTMLBuilder;
    protected prepareElement(): HTMLBuilder;
    protected prepareEvents(): HTMLBuilder;
    protected getHTMLFromMustache(): string;
}
