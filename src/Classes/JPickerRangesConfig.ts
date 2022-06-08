import {RangeInterface} from "../Interface/RangeInterface";
import {Tools} from "./Tools";
import {JPickerConfig} from "./JPickerConfig";

export class JPickerRangesConfig {

    public static THIS_WEEK = 'this_week';

    public static LAST_WEEK = 'last_week';

    public static NEXT_WEEK = 'next_week';

    public static LAST_3_DAYS = 'last_3_days';

    public static LAST_7_DAYS = 'last_7_days';

    public static LAST_30_DAYS = 'last_30_days';

    public static THIS_MONTH = 'this_month';

    public static LAST_MONTH = 'last_month';

    public static NEXT_MONTH = 'next_month';

    public static THIS_QUARTER = 'this_quarter';

    public static LAST_QUARTER = 'last_quarter';

    public static NEXT_QUARTER = 'next_quarter';

    protected userRanges: Array<RangeInterface | string> = [];

    private config: JPickerConfig;

    public constructor(config: JPickerConfig, userRanges: Array<RangeInterface | string>) {
        this.config = config;
        if (Tools.isArray(userRanges)) {
            this.userRanges = userRanges;
        } else {
            this.userRanges = this.getDefaultsRanges();
        }
    }

    public getRanges(): Array<RangeInterface>
    {
        let ranges = [];

        this.userRanges.forEach((item: RangeInterface | string) => {
            ranges.push(this.parseRangeItem(item));
        });

        return ranges;
    }

    protected parseRangeItem(item: RangeInterface | string): RangeInterface
    {
        let result;

        if (Tools.isString(item)) {
            result = this.getRangeData(<string>item);
        } else {
            result = <RangeInterface>item;
        }
        result.range = this.parseRangeDate(result.range);

        return result;
    }

    protected parseRangeDate(input: Array<Date | number>): Array<Date>
    {
        let result = [];

        input.forEach((value) => {
            if (Tools.isDate(value)) {
                result.push(value);
            } else {
                result.push(new Date(<number>value * 1000));
            }
        });

        return result;
    }

    protected getRangeData(key: string): RangeInterface
    {
        let labels = this.config.getRangesLabel(),
            label = labels[key] || Tools.error('Range key "'+key+'" does not have label'),
            rangesTmp;

        switch (key) {
            case JPickerRangesConfig.THIS_WEEK:
            case JPickerRangesConfig.LAST_WEEK:
            case JPickerRangesConfig.NEXT_WEEK:
                rangesTmp = this.processWeeks(key);
                break;
            case JPickerRangesConfig.LAST_3_DAYS:
            case JPickerRangesConfig.LAST_7_DAYS:
            case JPickerRangesConfig.LAST_30_DAYS:
                rangesTmp = this.processLastDays(key);
                break;
            case JPickerRangesConfig.THIS_MONTH:
            case JPickerRangesConfig.LAST_MONTH:
            case JPickerRangesConfig.NEXT_MONTH:
                rangesTmp = this.processMonths(key);
                break;
            case JPickerRangesConfig.THIS_QUARTER:
            case JPickerRangesConfig.LAST_QUARTER:
            case JPickerRangesConfig.NEXT_QUARTER:
                rangesTmp = this.processQuarters(key);
                break;
            default:
                Tools.error('Range key "'+key+'" does not exist');
                break;
        }

        return {
            label: label,
            range: [
                new Date((new Date(rangesTmp[0])).setHours(0, 0, 0, 0)),
                new Date((new Date(rangesTmp[1])).setHours(23, 59, 59, 0))
            ]
        }
    }

    protected processWeeks(range: string): Array<number>
    {
        let today = this.config.getToday(),
            currentDay = today.getDay(),
            currentTime = today.getTime(),
            from,
            to;

        if (currentDay === 0) {
            currentDay = 7;
        }

        switch (range) {
            case JPickerRangesConfig.THIS_WEEK:
                from = currentTime - this.getTimeForDays(currentDay - 1);
                break;
            case JPickerRangesConfig.LAST_WEEK:
                from = currentTime - this.getTimeForDays(currentDay + 6);
                break;
            case JPickerRangesConfig.NEXT_WEEK:
                from = currentTime + this.getTimeForDays(7 - currentDay + 1);
                break;
        }

        to = from + this.getTimeForDays(6);

        return [from, to];
    }

    protected processLastDays(range: string): Array<number>
    {
        let to = this.config.getToday().getTime(),
            from = to;

        switch (range) {
            case JPickerRangesConfig.LAST_3_DAYS:
                from -= this.getTimeForDays(2);
                break;
            case JPickerRangesConfig.LAST_7_DAYS:
                from -= this.getTimeForDays(6);
                break;
            case JPickerRangesConfig.LAST_30_DAYS:
                from -= this.getTimeForDays(29);
                break;
        }

        return [from, to];
    }

    protected processMonths(range: string): Array<number>
    {
        let today = this.config.getToday(),
            currentMonth = today.getMonth(),
            nextMonth = currentMonth + 1,
            prevMonth = currentMonth - 1,
            currentYear = today.getFullYear(),
            nextYear = currentYear,
            prevYear = currentYear,
            from,
            to;

        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }

        switch (range) {
            case JPickerRangesConfig.THIS_MONTH:
                from = (new Date(currentYear, currentMonth)).getTime();
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.LAST_MONTH:
                from = (new Date(prevYear, prevMonth)).getTime();
                to = (new Date(currentYear, currentMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.NEXT_MONTH:
                from = (new Date(nextYear, nextMonth)).getTime();
                nextMonth++;
                if (nextMonth > 11) {
                    nextMonth = 0;
                    nextYear++;
                }
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
        }

        return [from, to];
    }

    protected processQuarters(range: string): Array<number>
    {
        let today = this.config.getToday(),
            currentQuarter,
            currentMonth = today.getMonth(),
            nextMonth,
            prevMonth,
            currentYear = today.getFullYear(),
            nextYear = currentYear,
            prevYear = currentYear,
            prevQuarter,
            nextQuarter,
            from,
            to,
            quarters = {
                1: [0, 1, 2],
                2: [3, 4, 5],
                3: [6, 7, 8],
                4: [9, 10, 11],
            };

        for (let _quarter in quarters) {
            if (quarters[_quarter].indexOf(currentMonth) > -1) {
                currentQuarter = Tools.int(_quarter);
            }
        }
        prevQuarter = currentQuarter - 1;
        nextQuarter = currentQuarter + 1;
        if (prevQuarter < 1) {
            prevQuarter = 4;
            prevYear--;
        }
        if (nextQuarter > 4) {
            nextQuarter = 1;
            nextYear++;
        }

        currentMonth = quarters[currentQuarter][0];
        prevMonth = quarters[prevQuarter][0];
        nextMonth = quarters[nextQuarter][0];

        switch (range) {
            case JPickerRangesConfig.THIS_QUARTER:
                from = (new Date(currentYear, currentMonth)).getTime();
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.LAST_QUARTER:
                from = (new Date(prevYear, prevMonth)).getTime();
                to = (new Date(currentYear, currentMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.NEXT_QUARTER:
                from = (new Date(nextYear, nextMonth)).getTime();
                nextMonth += 3;
                if (nextMonth > 11) {
                    nextMonth = nextMonth - 11;
                    nextYear++;
                }
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
        }

        return [from, to];
    }

    protected getTimeForDays(days: number): number
    {
        return days * 24 * 3600 * 1000;
    }

    protected getDefaultsRanges(): Array<string>
    {
        return [
            JPickerRangesConfig.THIS_WEEK,
            JPickerRangesConfig.LAST_WEEK,
            JPickerRangesConfig.NEXT_WEEK,
            JPickerRangesConfig.LAST_3_DAYS,
            JPickerRangesConfig.LAST_7_DAYS,
            JPickerRangesConfig.LAST_30_DAYS,
            JPickerRangesConfig.THIS_MONTH,
            JPickerRangesConfig.LAST_MONTH,
            JPickerRangesConfig.NEXT_MONTH,
            JPickerRangesConfig.THIS_QUARTER,
            JPickerRangesConfig.LAST_QUARTER,
            JPickerRangesConfig.NEXT_QUARTER,
        ];
    }

}
