import { RangeInterface } from "../Interface/RangeInterface";
export declare class JPickerRangesConfig {
    static THIS_WEEK: string;
    static LAST_WEEK: string;
    static NEXT_WEEK: string;
    static LAST_3_DAYS: string;
    static LAST_7_DAYS: string;
    static LAST_30_DAYS: string;
    static THIS_MONTH: string;
    static LAST_MONTH: string;
    static NEXT_MONTH: string;
    static THIS_QUARTER: string;
    static LAST_QUARTER: string;
    static NEXT_QUARTER: string;
    protected userRanges: Array<RangeInterface | string>;
    constructor(userRanges: Array<RangeInterface | string>);
    getRanges(): Array<RangeInterface>;
    protected parseRangeItem(item: RangeInterface | string): RangeInterface;
    protected parseRangeDate(input: Array<Date | number>): Array<Date>;
    protected getRangeData(key: string): RangeInterface;
    protected processWeeks(range: string): Array<number>;
    protected processLastDays(range: string): Array<number>;
    protected processMonths(range: string): Array<number>;
    protected processQuarters(range: string): Array<number>;
    protected getTimeForDays(days: number): number;
    protected getDefaultsRanges(): Array<string>;
}
