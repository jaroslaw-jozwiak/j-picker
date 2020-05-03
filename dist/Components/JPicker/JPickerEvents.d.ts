import { JPickerHelper } from "./JPickerHelper";
export declare class JPickerEvents extends JPickerHelper {
    protected dateOneTmp: Date;
    protected dateTwoTmp: Date;
    protected daysSelected: number;
    createEvents(): JPickerEvents;
    nextMonthClick(): JPickerEvents;
    prevMonthClick(): JPickerEvents;
    protected getDefaultEvents(): Object;
    protected addListeners(events: Object): JPickerEvents;
    protected dayClick(day: number, date: Array<number>): JPickerEvents;
    protected setRange(): JPickerEvents;
    protected dayMouseEnter(day: number, date: Array<number>): JPickerEvents;
    protected dayMouseLeave(day: number, date: Array<number>): JPickerEvents;
    protected rangeClick(FromDate: Date, ToDate: Date): JPickerEvents;
    protected valueClick(ValueDate: Date): JPickerEvents;
    protected changeMonth(increment: boolean): JPickerEvents;
    protected setMonthAndYear(month: number, year: number): JPickerEvents;
}
