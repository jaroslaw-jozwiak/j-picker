import { Picker } from "../Picker";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { ElementInterface } from "../../Interface/ElementInterface";
import { JPickerConfig } from "../../Classes/JPickerConfig";
import { Event } from '../../Classes/Event';
export declare class MonthPicker extends Picker {
    protected month: number;
    private event;
    private config;
    constructor(event: Event, config: JPickerConfig, month: number);
    setMonth(month: number): MonthPicker;
    protected getEvents(): Array<HTMLEvent>;
    protected onMonthClick(that: MonthPicker): any;
    protected getMustacheVars(): Object;
    protected getMonths(): Array<ElementInterface>;
    protected getMustache(): any;
}
