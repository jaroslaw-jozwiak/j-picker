import { HTMLBuilder } from "./HTMLBuilder";
import { HTMLEvent } from "../Interface/HTMLEvent";
export declare abstract class Component {
    protected HTMLBuilderI: HTMLBuilder;
    protected componentPrepared: boolean;
    constructor();
    getHTMLElement(): HTMLElement;
    refreshHTMLElement(): Component;
    show(): Component;
    hide(): Component;
    protected onComponentPreparation(): Component;
    protected getEventObject(selector: string, type: string, callback: Function): HTMLEvent;
    protected getEvents(): Array<HTMLEvent>;
    protected getMustacheVars(): Object;
    protected abstract getMustache(): any;
}
