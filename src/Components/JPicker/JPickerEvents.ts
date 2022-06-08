import { MonthPicker } from './../MonthPicker/MonthPicker';
import {Event} from "../../Classes/Event";
import {
    DAY_CLICK,
    DAY_MOUSE_ENTER,
    DAY_MOUSE_LEAVE,
    NEXT_MONTH_CLICK,
    PREV_MONTH_CLICK, 
    RANGE_CLICK, 
    VALUE_CLICK,
    MENU_MONTH_CLICK,
    MONTH_CLICK
} from "../../Classes/EventsDict";
import {Tools} from "../../Classes/Tools";
import {JPickerHelper} from "./JPickerHelper";

export class JPickerEvents extends JPickerHelper {

    protected dateOneTmp: Date;

    protected dateTwoTmp: Date;

    protected daysSelected: number = 0;

    public createEvents(): JPickerEvents
    {
        return this
            .addListeners(this.getDefaultEvents())
            .addListeners(this.config.getObjectValue('events'));
    }

    public nextMonthClick(): JPickerEvents
    {
        return this.changeMonth(true);
    }

    public prevMonthClick(): JPickerEvents
    {
        return this.changeMonth(false);
    }

    protected getDefaultEvents(): Object
    {
        let result = {},
            that = this;

        [
            [NEXT_MONTH_CLICK, this.nextMonthClick],
            [PREV_MONTH_CLICK, this.prevMonthClick],
            [DAY_CLICK, this.dayClick],
            [DAY_MOUSE_ENTER, this.dayMouseEnter],
            [DAY_MOUSE_LEAVE, this.dayMouseLeave],
            [RANGE_CLICK, this.rangeClick],
            [VALUE_CLICK, this.valueClick],
            [MENU_MONTH_CLICK, this.menuMonthClick],
            [MONTH_CLICK, this.monthClick],
        ].forEach((eventArray: Array<string | Function>) => {
            result[eventArray[0].toString()] = function() {
                (<Function>eventArray[1]).apply(that, arguments);
            };
        });

        return result;
    }

    protected addListeners(events: Object): JPickerEvents
    {
        for (let eventName in events) {
            if (Tools.isFunction(events[eventName])) {
                this.event.addListener(eventName, events[eventName]);
            }
        }

        return this;
    }

    protected dayClick(day: number, date: Array<number>): JPickerEvents
    {
        let DateI = new Date(date[2], date[1] - 1, date[0]);

        if (this.config.isRange()) {
            if ((this.daysSelected % 2) === 0) {
                this.dateOneTmp = DateI;
                this.dateTwoTmp = null;
                this.JPickerI.getBuilder().getValue().setDateOne(DateI).setDateTwoOpacity(true).refresh();
                this.JPickerI.getBuilder()
                    .getDayPicker()
                    .setSelectedDay(DateI, 0)
                    .setSelectedDay(null, 1)
                    .refreshSelectedDays();
            } else {
                this.dateTwoTmp = new Date(DateI.getTime() + (24 * 3600 * 1000) - 1);
                this.setRange();
            }
            this.daysSelected++;
        } else {
            this.JPickerI.setCurrentValue([DateI]);
            this.JPickerI.getBuilder().getValue().setDateOne(DateI).refresh();
            this.JPickerI.getBuilder().getDayPicker().setSelectedDay(DateI, 0).refreshSelectedDays();
        }

        return this;
    }

    protected setRange(): JPickerEvents
    {
        let time1 = this.dateOneTmp.getTime(),
            time2 = this.dateTwoTmp.getTime(),
            ValueI = this.JPickerI.getBuilder().getValue(),
            DayPickerI = this.JPickerI.getBuilder().getDayPicker(),
            DateTmp;

        if (time1 > time2) {
            DateTmp = this.dateOneTmp;
            this.dateOneTmp = this.dateTwoTmp;
            this.dateTwoTmp = DateTmp;
        }
        ValueI.setDateOne(this.dateOneTmp);
        DayPickerI.setSelectedDay(this.dateOneTmp, 0);

        this.JPickerI.setCurrentValue([this.dateOneTmp, this.dateTwoTmp]);
        ValueI.setDateTwo(this.dateTwoTmp).setDateTwoOpacity(false).refresh();
        DayPickerI.setSelectedDay(this.dateTwoTmp, 1).refreshSelectedDays();

        return this;
    }

    protected dayMouseEnter(day: number, date: Array<number>): JPickerEvents
    {
        if (this.config.isRange() && this.dateTwoTmp === null) {
            let DateI = new Date(date[2], date[1] - 1, date[0]);

            this.JPickerI.getBuilder().getDayPicker().setDayWithMouseEnter(DateI).refreshSelectedDays();
        }

        return this;
    }

    protected dayMouseLeave(day: number, date: Array<number>): JPickerEvents
    {
        if (this.config.isRange() && this.dateTwoTmp === null) {
            this.JPickerI.getBuilder().getDayPicker().setDayWithMouseEnter(null).refreshSelectedDays();
        }

        return this;
    }

    protected rangeClick(FromDate: Date, ToDate: Date): JPickerEvents
    {
        let visibleDate = this.JPickerI.getVisibleDate(),
            month = FromDate.getMonth() + 1,
            year = FromDate.getFullYear();

        this.dateOneTmp = FromDate;
        this.dateTwoTmp = ToDate;
        this.setRange();

        if (month !== visibleDate[0] || year !== visibleDate[1]) {
            this.setMonthAndYear(month, year);
        }

        return this;
    }

    protected valueClick(ValueDate: Date): JPickerEvents
    {
        let visibleDate = this.JPickerI.getVisibleDate(),
            month = ValueDate.getMonth() + 1,
            year = ValueDate.getFullYear();

        if (month !== visibleDate[0] || year !== visibleDate[1]) {
            this.setMonthAndYear(month, year);
        }

        return this;
    }

    protected menuMonthClick(): JPickerEvents 
    {
        this.JPickerI.getBuilder().getMonthPicker().show();

        return this;
    }

    protected monthClick(month: number): JPickerEvents 
    {
        let visibleDate = this.JPickerI.getVisibleDate(),
            year = visibleDate[1];
            
        this.JPickerI.getBuilder().getMonthPicker().hide();

        return this.setMonthAndYear(month, year);
    }

    protected changeMonth(increment: boolean): JPickerEvents
    {
        let visibleDate = this.JPickerI.getVisibleDate(),
            month = visibleDate[0],
            year = visibleDate[1];

        month += (increment ? 1 : -1);
        if (month > 12) {
            month = 1;
            year++;
        }
        if (month < 1) {
            month = 12;
            year--;
        }

        return this.setMonthAndYear(month, year);
    }

    protected setMonthAndYear(month: number, year: number): JPickerEvents
    {
        let DayPickerI = this.JPickerI.getBuilder().getDayPicker(),
            MonthPickerI = this.JPickerI.getBuilder().getMonthPicker(),
            currentDaysWrapper = this.JPickerI.getHTMLElement().querySelector('.jpicker-days-wrapper'),
            currentMonthsWrapper = this.JPickerI.getHTMLElement().querySelector('.jpicker-months-wrapper');

        DayPickerI.setMonth(month).setYear(year).refreshHTMLElement();
        DayPickerI.refreshSelectedDays();
        MonthPickerI.setMonth(month).refreshHTMLElement();
        currentDaysWrapper.replaceWith(DayPickerI.getHTMLElement());
        currentMonthsWrapper.replaceWith(MonthPickerI.getHTMLElement());
        this.JPickerI.getBuilder().getMenu().setValues(month, year);
        this.JPickerI.setVisibleDate([month, year]);

        return this;
    }

}
