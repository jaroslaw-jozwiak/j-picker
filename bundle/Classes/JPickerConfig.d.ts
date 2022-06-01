import { JPickerConfigInterface } from "../Interface/JPickerConfigInterface";
import { RangeInterface } from "../Interface/RangeInterface";
export declare class JPickerConfig {
    private static Instance;
    private constructor();
    private config;
    static get(): JPickerConfig;
    setConfig(config?: JPickerConfigInterface): JPickerConfig;
    getTextValue(key: string): string;
    getObjectValue(key: string): Object;
    isRange(): boolean;
    getWrapper(): string;
    getToday(): Date;
    getCurrentValue(): Array<Date>;
    getMonths(): Array<string>;
    getWeeksDays(): Array<string>;
    showRangesPredefined(): boolean;
    getRangesSet(): Array<RangeInterface>;
    getRangesLabel(): Object;
    getRangesTitle(): string;
}
