import {RangeInterface} from "./RangeInterface";

export interface JPickerConfigInterface
{
    wrapper?: string;

    range?: boolean;

    currentDate?: Array<Date | number> | Date | number;

    today?: Date | number;

    weekDays?: Array<string>;

    months?: Array<string>;

    events?: {
        [enentName: string]: Function
    };

    rangesSet?: Array<RangeInterface | string>;

    rangesLabels?: {
        [rangeName: string]: string
    };

    rangesTitle?: string;

}
