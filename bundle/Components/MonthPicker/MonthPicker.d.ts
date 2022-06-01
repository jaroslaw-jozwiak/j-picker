import { Picker } from "../Picker";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { ElementInterface } from "../../Interface/ElementInterface";
export declare class MonthPicker extends Picker {
    protected month: number;
    constructor(month: number);
    setMonth(month: number): MonthPicker;
    protected getEvents(): Array<HTMLEvent>;
    protected onMonthClick(that: MonthPicker): any;
    protected getMustacheVars(): Object;
    protected getMonths(): Array<ElementInterface>;
    protected getMustache(): any;
}
