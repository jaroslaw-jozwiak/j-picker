import { Picker } from "../Picker";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { ElementInterface } from "../../Interface/ElementInterface";
export declare class MonthPicker extends Picker {
    protected month: number;
    constructor(month: number);
    protected getEvents(): Array<HTMLEvent>;
    protected onMonthClick(): any;
    protected getMustacheVars(): Object;
    protected getMonths(): Array<ElementInterface>;
    protected getMustache(): any;
}
