import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { DayPicker } from "../DayPicker/DayPicker";
import { MonthPicker } from "../MonthPicker/MonthPicker";
import { YearPicker } from "../YearPicker/YearPicker";
import { Value } from "../Value/Value";
import { JPickerHelper } from "./JPickerHelper";
import { Ranges } from "../Ranges/Ranges";
export declare class JPickerBuilder extends JPickerHelper {
    protected HeaderI: Header;
    protected ValueI: Value;
    protected MenuI: Menu;
    protected DayPickerI: DayPicker;
    protected MonthPickerI: MonthPicker;
    protected YearPickerI: YearPicker;
    protected RangesI: Ranges;
    buildHTML(): JPickerBuilder;
    getHeader(): Header;
    getValue(): Value;
    getMenu(): Menu;
    setDayPicker(DayPickerI: DayPicker): JPickerBuilder;
    getDayPicker(): DayPicker;
    getMonthPicker(): MonthPicker;
    getYearPicker(): YearPicker;
    getRanges(): Ranges;
    protected prepareHeader(): JPickerBuilder;
    protected prepareValue(): JPickerBuilder;
    protected prepareMenu(): JPickerBuilder;
    protected prepareDayPicker(): JPickerBuilder;
    protected prepareMonthPicker(): JPickerBuilder;
    protected prepareYearPicker(): JPickerBuilder;
    protected prepareRanges(): JPickerBuilder;
}
