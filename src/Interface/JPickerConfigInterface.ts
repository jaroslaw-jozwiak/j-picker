import {RangeInterface} from "./RangeInterface";

export interface JPickerConfigInterface
{
    wrapper?: string;

    range?: boolean;

    currentDate?: Array<Date | number> | Date | number;

    today?: Date | number;

    weekDays?: Array<string>;

    months?: Array<string>;

    events?: Object;

    rangesSet?: Array<RangeInterface | string>;

    rangesLabels?: Object;

    rangesTitle?: string;

}
