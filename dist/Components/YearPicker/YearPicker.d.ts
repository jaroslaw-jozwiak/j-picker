import { Picker } from "../Picker";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { ElementInterface } from "../../Interface/ElementInterface";
export declare class YearPicker extends Picker {
    protected year: number;
    constructor(year?: number);
    protected getEvents(): Array<HTMLEvent>;
    protected onYearClick(): any;
    protected getMustacheVars(): Object;
    protected getYears(): Array<ElementInterface>;
    protected getCurrentYear(): number;
    protected getMustache(): any;
}
