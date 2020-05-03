import { Picker } from "../Picker";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { CalendarCell } from "./CalendarCell";
export declare class DayPicker extends Picker {
    protected selectedDays: Array<Date>;
    protected dayWithMouse: Date;
    protected month: number;
    protected year: number;
    constructor(month: number, year: number);
    setMonth(month: number): DayPicker;
    setYear(year: number): DayPicker;
    setSelectedDay(Day: Date, whichDay?: number): DayPicker;
    setDayWithMouseEnter(dayWithMouse: Date): DayPicker;
    refreshSelectedDays(): DayPicker;
    getMonthSet(): Array<Array<Object>>;
    getFirstWeekDay(): number;
    getDaysInMonth(): number;
    protected getEvents(): Array<HTMLEvent>;
    protected onDayClick(that: DayPicker): Function;
    protected onDayMouseEnter(that: DayPicker): Function;
    protected onDayMouseLeave(that: DayPicker): Function;
    protected getMustacheVars(): Object;
    protected getMustache(): any;
    protected isToday(dayNb: number): boolean;
    protected getMonthCells(): Array<Array<CalendarCell>>;
    protected getClassForSelectedDays(day: number): string;
    protected getLabelsRow(): Array<CalendarCell>;
}
