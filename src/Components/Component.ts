import {HTMLBuilder} from "./HTMLBuilder";
import {HTMLEvent} from "../Interface/HTMLEvent";

export abstract class Component {

    protected HTMLBuilderI: HTMLBuilder = null;

    protected componentPrepared: boolean = false;

    public constructor() {
        this.HTMLBuilderI = new HTMLBuilder();
    }

    public getHTMLElement(): HTMLElement {
        if (!this.componentPrepared) {
            this.onComponentPreparation();
            this.HTMLBuilderI
                .setMustache(this.getMustache())
                .setMustacheVars(this.getMustacheVars())
                .setEvents(this.getEvents());
            this.componentPrepared = true;
        }

        return this.HTMLBuilderI.getHTMLElement();
    }

    public refreshHTMLElement(): Component
    {
        this.componentPrepared = false;
        this.HTMLBuilderI = new HTMLBuilder();
        this.getHTMLElement();

        return this;
    }

    public show(): Component
    {
        this.getHTMLElement().classList.remove('jpicker-hidden');
        
        return this;
    }

    public hide(): Component
    {
        this.getHTMLElement().classList.add('jpicker-hidden');

        return this;
    }

    protected onComponentPreparation(): Component {
        return this;
    }

    protected getEventObject(selector: string, type: string, callback: Function): HTMLEvent {
        return {
            selector: selector,
            type: type,
            callback: callback
        };
    }

    protected getEvents(): Array<HTMLEvent> {
        return [];
    }

    protected getMustacheVars(): Object {
        return {};
    }

    protected abstract getMustache(): any;

}
