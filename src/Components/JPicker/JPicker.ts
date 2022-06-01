import { DOM } from "../../Classes/DOM";
import { JPickerConfigInterface } from "../../Interface/JPickerConfigInterface";
import { JPickerConfig } from "../../Classes/JPickerConfig";
import {Component} from "../Component";
import {Event} from "../../Classes/Event";
import {JPickerBuilder} from "./JPickerBuilder";
import {JPickerEvents} from "./JPickerEvents";
import {JPickerChanger} from "./JPickerChanger";
import { CHANGE_VALUE } from "../../Classes/EventsDict";

export class JPicker extends Component
{
    protected JPickerBuilderI: JPickerBuilder;

    protected JPickerEventsI: JPickerEvents;

    protected JPickerChangerI: JPickerChanger;

    protected currentValue: Array<Date>;

    protected visibleDate: Array<number>;

    public constructor(config: JPickerConfigInterface = null)
    {
        super();
        JPickerConfig.get().setConfig(config);
        Event.get().setJPicker(this);
        this.JPickerBuilderI = new JPickerBuilder(this);
        this.JPickerEventsI = new JPickerEvents(this);
        this.JPickerChangerI = new JPickerChanger(this);
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
        Event.get().trigger(CHANGE_VALUE, currentValue);

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
        let Wrapper = new DOM(JPickerConfig.get().getWrapper());

        this.JPickerBuilderI.buildHTML();
        this.JPickerEventsI.createEvents();

        Wrapper.get().appendChild(this.getHTMLElement());
    }

    protected getMustache(): any
    {
        //return './JPicker.mustache';
        return require('./JPicker.mustache');
    }

}
