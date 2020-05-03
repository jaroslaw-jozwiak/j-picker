import { JPickerConfigInterface } from "../../Interface/JPickerConfigInterface";
import { Component } from "../Component";
import { JPickerBuilder } from "./JPickerBuilder";
import { JPickerEvents } from "./JPickerEvents";
import { JPickerChanger } from "./JPickerChanger";
export declare class JPicker extends Component {
    protected JPickerBuilderI: JPickerBuilder;
    protected JPickerEventsI: JPickerEvents;
    protected JPickerChangerI: JPickerChanger;
    protected currentValue: Array<Date>;
    protected visibleDate: Array<number>;
    constructor(config?: JPickerConfigInterface);
    getBuilder(): JPickerBuilder;
    getCurrentValue(): Array<Date>;
    setCurrentValue(currentValue: Array<Date>): JPicker;
    getVisibleDate(): Array<number>;
    setVisibleDate(visibleDate: Array<number>): JPicker;
    changeDate(): void;
    protected run(): void;
    protected getMustache(): any;
}
