import { JPickerConfigInterface } from "../../Interface/JPickerConfigInterface";
import { Component } from "../Component";
import { JPickerBuilder } from "./JPickerBuilder";
export declare class JPicker extends Component {
    private JPickerBuilderI;
    private JPickerEventsI;
    private currentValue;
    private visibleDate;
    private event;
    private config;
    constructor(config?: JPickerConfigInterface);
    getBuilder(): JPickerBuilder;
    getCurrentValue(): Array<Date>;
    setCurrentValue(currentValue: Array<Date>): JPicker;
    getVisibleDate(): Array<number>;
    setVisibleDate(visibleDate: Array<number>): JPicker;
    protected run(): void;
    protected getMustache(): any;
}
