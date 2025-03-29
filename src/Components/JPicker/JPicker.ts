import { DOM } from "../../Classes/DOM";
import { JPickerConfigInterface } from "../../Interface/JPickerConfigInterface";
import { JPickerConfig } from "../../Classes/JPickerConfig";
import {Component} from "../Component";
import {Event} from "../../Classes/Event";
import {JPickerBuilder} from "./JPickerBuilder";
import {JPickerEvents} from "./JPickerEvents";
import { CHANGE_VALUE } from "../../Classes/EventsDict";
import "../../JPicker.scss";

export class JPicker extends Component
{
    private JPickerBuilderI: JPickerBuilder;

    private JPickerEventsI: JPickerEvents;

    private currentValue: Array<Date>;

    private visibleDate: Array<number>;

    private event: Event;

    private config: JPickerConfig;

    public constructor(config: JPickerConfigInterface = null)
    {
        super();
        this.event = new Event();
        this.config = new JPickerConfig(config);
        this.JPickerBuilderI = new JPickerBuilder(this, this.event, this.config);
        this.JPickerEventsI = new JPickerEvents(this, this.event, this.config);
        this.run();
    }

    public getBuilder(): JPickerBuilder
    {
        return this.JPickerBuilderI;
    }

    public getCurrentValue(): Array<Date>
    {
        return this.currentValue;
    }

    public setCurrentValue(currentValue: Array<Date>): JPicker
    {
        this.currentValue = currentValue;
        this.event.trigger(CHANGE_VALUE, currentValue);

        return this;
    }

    public getVisibleDate(): Array<number>
    {
        return this.visibleDate;
    }

    public setVisibleDate(visibleDate: Array<number>): JPicker
    {
        this.visibleDate = visibleDate;

        return this;
    }

    protected run()
    {
        const wrapper = new DOM(this.config.getWrapper());

        this.JPickerBuilderI.buildHTML();
        this.JPickerEventsI.createEvents();

        wrapper.get().appendChild(this.getHTMLElement());
    }

    protected getMustache(): any
    {
        return require('./JPicker.mustache');
    }

}
