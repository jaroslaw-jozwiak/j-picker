import { JPickerConfigInterface } from "../Interface/JPickerConfigInterface";
import {Tools} from "./Tools";
import {RangeInterface} from "../Interface/RangeInterface";
import {JPickerRangesConfig} from "./JPickerRangesConfig";

export class JPickerConfig
{
    private static Instance: JPickerConfig = null;

    private config: JPickerConfigInterface = {};

    public constructor(config: JPickerConfigInterface = null)
    {
        this.setConfig(config);
    }

    public setConfig(config: JPickerConfigInterface = null): JPickerConfig
    {
        if (config !== null && typeof config === 'object') {
            for (let key in config) {
                this.config[key] = config[key];
            }
        }

        return this;
    }

    public getTextValue(key: string): string
    {
        return (this.config[key] || '').toString();
    }

    public getObjectValue(key: string): Object
    {
        let result = this.config[key] || {};

        if (typeof result !== 'object') {
            Tools.error('Wrong value in config for field "'+key+'"');
        }

        return result;
    }

    public isRange(): boolean
    {
        return this.config.range || false;
    }

    public getWrapper(): string
    {
        return this.config.wrapper || '';
    }

    public getToday(): Date
    {
        return Tools.getDate(this.config.today, new Date);
    }

    public getCurrentValue(): Array<Date>
    {
        let value = this.config.currentDate,
            date = Tools.getDate(value),
            result = [],
            date1,
            date2,
            time1,
            time2;

        if (date !== null) {
            result.push(date);
        } else if (Tools.isArray(value)) {
            date1 = Tools.getDate(value[0]);
            date2 = Tools.getDate(value[1]);
            if (date1 !== null && date2 !== null) {
                result.push(date1, date2);
            }
        }

        if (result.length === 0) {
            result.push(this.getToday());
        }

        if (this.isRange() && Tools.u(result[1])) {
            time1 = result[0].getTime();
            time2 = time1 + (24 * 3600 * 1000);
            result[1] = new Date(time2);
        }

        return result;
    }

    public getMonths(): Array<string>
    {
        return this.config.months || [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    }

    public getWeeksDays(): Array<string>
    {
        return this.config.weekDays || [
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sat',
            'Sun',
        ];
    }

    public showRangesPredefined(): boolean
    {
        return this.isRange() &&
            (
                (Tools.isArray(this.config.rangesSet) && this.config.rangesSet.length > 0)
                || Tools.u(this.config.rangesSet)
            );
    }

    public getRangesSet(): Array<RangeInterface>
    {
        let rangesSet = this.config.rangesSet;

        if (this.showRangesPredefined()) {
            if (Tools.u(rangesSet)) {
                rangesSet = null;
            }

            return (new JPickerRangesConfig(this, this.config.rangesSet)).getRanges();
        }

        return [];
    }

    public getRangesLabel(): Object
    {
        let defaultLabels = {},
            result = this.config.rangesLabels || {};

        defaultLabels[JPickerRangesConfig.THIS_WEEK] = 'This week';
        defaultLabels[JPickerRangesConfig.LAST_WEEK] = 'Last week';
        defaultLabels[JPickerRangesConfig.NEXT_WEEK] = 'Next week';
        defaultLabels[JPickerRangesConfig.LAST_3_DAYS] = 'Last 3 days';
        defaultLabels[JPickerRangesConfig.LAST_7_DAYS] = 'Last 7 days';
        defaultLabels[JPickerRangesConfig.LAST_30_DAYS] = 'Last 30 days';
        defaultLabels[JPickerRangesConfig.THIS_MONTH] = 'This month';
        defaultLabels[JPickerRangesConfig.LAST_MONTH] = 'Last month';
        defaultLabels[JPickerRangesConfig.NEXT_MONTH] = 'Next month';
        defaultLabels[JPickerRangesConfig.THIS_QUARTER] = 'This quarter';
        defaultLabels[JPickerRangesConfig.LAST_QUARTER] = 'Last quarter';
        defaultLabels[JPickerRangesConfig.NEXT_QUARTER] = 'Next quarter';

        for (let key in defaultLabels) {
            if (Tools.u(result[key])) {
                result[key] = defaultLabels[key];
            }
        }

        return result;
    }

    public getRangesTitle(): string
    {
        return this.config.rangesTitle || 'Choose range';
    }

}
