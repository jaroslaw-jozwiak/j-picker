import { Component } from "../Component";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { Event } from "../../Classes/Event";
export declare class Value extends Component {
    protected date1: Date;
    protected dateOpacity1: boolean;
    protected date2: Date;
    protected dateOpacity2: boolean;
    private event;
    constructor(event: Event, date1?: Date, date2?: Date);
    setDateOne(date1: Date): Value;
    setDateTwo(date2: Date): Value;
    setDateOneOpacity(dateOpacity1: boolean): Value;
    setDateTwoOpacity(dateOpacity2: boolean): Value;
    refresh(): Value;
    protected getDateFormatted(date: Date): string;
    protected getWithZero(value: number): string;
    protected getEvents(): Array<HTMLEvent>;
    protected onValueClick(that: Value): Function;
    protected getMustacheVars(): Object;
    protected getMustache(): any;
}
