import {Header} from "../Header/Header";
import {Menu} from "../Menu/Menu";
import {DayPicker} from "../DayPicker/DayPicker";
import {MonthPicker} from "../MonthPicker/MonthPicker";
import {YearPicker} from "../YearPicker/YearPicker";
import {Value} from "../Value/Value";
import {JPickerHelper} from "./JPickerHelper";
import {Tools} from "../../Classes/Tools";
import {Ranges} from "../Ranges/Ranges";
import { JPicker } from "./JPicker";
import { Event } from "../../Classes/Event";

export class JPickerBuilder extends JPickerHelper {

    protected HeaderI: Header;

    protected ValueI: Value;

    protected MenuI: Menu;

    protected DayPickerI: DayPicker;

    protected MonthPickerI: MonthPicker;

    protected YearPickerI: YearPicker;

    protected RangesI: Ranges;

    public buildHTML(): JPickerBuilder
    {
        let JPickerHTML = this.JPickerI.getHTMLElement();
        this
            .prepareHeader()
            .prepareValue()
            .prepareMenu()
            .prepareDayPicker()
            .prepareMonthPicker()
            .prepareYearPicker()
            .prepareRanges();
        JPickerHTML.appendChild(this.HeaderI.getHTMLElement());
        JPickerHTML.appendChild(this.ValueI.getHTMLElement());
        JPickerHTML.appendChild(this.MenuI.getHTMLElement());
        JPickerHTML.appendChild(this.MonthPickerI.getHTMLElement());
        JPickerHTML.appendChild(this.DayPickerI.getHTMLElement());
        if (this.config.showRangesPredefined()) {
            JPickerHTML.appendChild(this.RangesI.getHTMLElement());
        }
        //@todo year picker
        //JPickerHTML.appendChild(this.YearPickerI.getHTMLElement());

        return this;
    }

    public getHeader(): Header
    {
        return this.HeaderI;
    }

    public getValue(): Value
    {
        return this.ValueI;
    }

    public getMenu(): Menu
    {
        return this.MenuI;
    }

    public setDayPicker(DayPickerI: DayPicker): JPickerBuilder
    {
        this.DayPickerI = DayPickerI;

        return this;
    }

    public getDayPicker(): DayPicker
    {
        return this.DayPickerI;
    }

    public getMonthPicker(): MonthPicker
    {
        return this.MonthPickerI;
    }

    public getYearPicker(): YearPicker
    {
        return this.YearPickerI;
    }

    public getRanges(): Ranges
    {
        return this.RangesI;
    }

    public showMonthPicker(): JPickerBuilder
    {
        

        return this;
    }

    protected prepareHeader(): JPickerBuilder
    {
        let title = this.config.getTextValue('title'),
            description = this.config.getTextValue('description');

        this.HeaderI = new Header(title, description);

        return this;
    }

    protected prepareValue(): JPickerBuilder
    {
        let currentValue = this.config.getCurrentValue();

        this.JPickerI.setCurrentValue(currentValue);
        this.ValueI = new Value(this.event, currentValue[0], currentValue[1] || null);

        return this;
    }

    protected prepareMenu(): JPickerBuilder
    {
        let currentDate = this.config.getCurrentValue()[0];

        this.MenuI = new Menu(
            this.event,
            this.config,
            currentDate.getMonth() + 1, 
            currentDate.getFullYear()
        );

        return this;
    }

    protected prepareDayPicker(): JPickerBuilder
    {
        let currentValues = this.config.getCurrentValue(),
            currentDate = currentValues[0],
            m = currentDate.getMonth() + 1,
            y = currentDate.getFullYear();

        this.JPickerI.setVisibleDate([m, y]);
        this.DayPickerI = new DayPicker(this.event, this.config, m, y);
        this.DayPickerI.setSelectedDay(currentDate, 0);
        if (Tools.d(currentValues[1])) {
            this.DayPickerI.setSelectedDay(currentValues[1], 1);
        }

        return this;
    }

    protected prepareMonthPicker(): JPickerBuilder
    {
        let currentDate = this.config.getCurrentValue()[0];

        this.MonthPickerI = new MonthPicker(
            this.event,
            this.config,
            currentDate.getMonth() + 1
        );

        return this;
    }

    protected prepareYearPicker(): JPickerBuilder
    {
        let currentDate = this.config.getCurrentValue()[0];

        this.YearPickerI = new YearPicker(currentDate.getFullYear());

        return this;
    }

    protected prepareRanges(): JPickerBuilder
    {
        this.RangesI = new Ranges(this.event, this.config);

        return this;
    }

}
