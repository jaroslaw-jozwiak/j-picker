import {Picker} from "../Picker";
import {JPickerConfig} from "../../Classes/JPickerConfig";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {DAY_CLICK, DAY_MOUSE_ENTER, DAY_MOUSE_LEAVE} from "../../Classes/EventsDict";
import {Event} from "../../Classes/Event";
import {Tools} from "../../Classes/Tools";
import {DOM} from "../../Classes/DOM";
import {CalendarCell} from "./CalendarCell";

export class DayPicker extends Picker {

    protected selectedDays: Array<Date> = [];

    protected dayWithMouse: Date = null;

    protected month: number;

    protected year: number;

    public constructor(month: number, year: number)
    {
        super();
        this.month = month;
        this.year = year;
    }

    public setMonth(month: number): DayPicker
    {
        this.month = month;

        return this;
    }

    public setYear(year: number): DayPicker
    {
        this.year = year;

        return this;
    }

    public setSelectedDay(Day: Date, whichDay: number = 0): DayPicker
    {
        if (Day === null) {
            this.selectedDays.splice(whichDay, 1);
        } else {
            this.selectedDays[whichDay] = Day;
        }

        return this;
    }

    public setDayWithMouseEnter(dayWithMouse: Date): DayPicker
    {
        this.dayWithMouse = dayWithMouse;

        return this;
    }

    public refreshSelectedDays(): DayPicker
    {
        let HTMLElement = this.getHTMLElement(),

            classForDay = '';

        (new DOM('.jpicker-selected-range-day', HTMLElement)).removeClass('jpicker-selected-range-day');
        (new DOM('.jpicker-selected-day', HTMLElement)).removeClass('jpicker-selected-day');

        //@todo optimize!
        for (let day = 1; day <= 31; day++) {
            classForDay = this.getClassForSelectedDays(day);
            if (classForDay.length > 0) {
                (new DOM('[data-day="'+day+'"]', HTMLElement)).addClass(classForDay);
            }
        }

        return this;
    }


    public getMonthSet(): Array<Array<Object>>
    {
        return [].concat([this.getLabelsRow()], this.getMonthCells());
    }

    public getFirstWeekDay(): number
    {
        return (new Date(this.year, this.month - 1, 1)).getDay();
    }

    public getDaysInMonth(): number
    {
        let _31 = [1, 3, 5, 7, 8, 10, 12];

        if (this.month === 2) {
            return (this.year % 4) === 0 ? 29 : 28;
        }

        return _31.indexOf(this.month) > -1 ? 31 : 30;
    }

    protected getEvents(): Array<HTMLEvent>
    {
        return [
            this.getEventObject('.jpicker-calendar-cell.av', 'click', this.onDayClick(this)),
            this.getEventObject('.jpicker-calendar-cell.av', 'mouseenter', this.onDayMouseEnter(this)),
            this.getEventObject('.jpicker-calendar-cell.av', 'mouseleave', this.onDayMouseLeave(this))
        ];
    }

    protected onDayClick(that: DayPicker): Function
    {
        return function(EventData: MouseEvent) {
            let day = (<HTMLElement>this).getAttribute('data-day'),
                dayConverted = Tools.int(day);

            Event.get().trigger(DAY_CLICK, dayConverted, [dayConverted, that.month, that.year]);
        }
    }

    protected onDayMouseEnter(that: DayPicker): Function
    {
        return function(EventData: MouseEvent) {
            let day = (<HTMLElement>this).getAttribute('data-day'),
                dayConverted = Tools.int(day);

            Event.get().trigger(DAY_MOUSE_ENTER, dayConverted, [dayConverted, that.month, that.year]);
        }
    }

    protected onDayMouseLeave(that: DayPicker): Function
    {
        return function(EventData: MouseEvent) {
            let day = (<HTMLElement>this).getAttribute('data-day'),
                dayConverted = Tools.int(day);

            Event.get().trigger(DAY_MOUSE_LEAVE, dayConverted, [dayConverted, that.month, that.year]);
        }
    }

    protected getMustacheVars(): Object
    {
        return {
            calendar: this.getMonthSet()
        };
    }

    protected getMustache(): any {
        return require('./DayPicker.mustache');
    }

    protected isToday(dayNb: number): boolean
    {
        let today = JPickerConfig.get().getToday(),
            processingDay = new Date(this.year, this.month - 1, dayNb);

        return today.getDate() === processingDay.getDate()
            && today.getMonth() === processingDay.getMonth()
            && today.getFullYear() === processingDay.getFullYear();
    }

    protected getMonthCells(): Array<Array<CalendarCell>>
    {
        let flag = true,
            firstIteration = true,
            firstDay = this.getFirstWeekDay(),
            daysCount = this.getDaysInMonth(),
            isRange = JPickerConfig.get().isRange(),
            result = [],
            _day = 0,
            counter;

        if (firstDay === 0) {
            firstDay = 7;
        }

        while (flag) {
            let week = [];
            for (counter = 1; counter <= 7; counter++) {
                let CalendarCellI = new CalendarCell;

                if (firstIteration && counter < firstDay) {
                    CalendarCellI.setClass('empty');
                    _day = 0;
                } else if (_day < daysCount && flag) {
                    _day++;
                    CalendarCellI
                        .addClass('av')
                        .addClass(this.getClassForSelectedDays(_day))
                        .addAttribute('day', _day);
                    if (_day === daysCount && counter === 7) {
                        flag = false;
                    }
                } else {
                    CalendarCellI.setClass('empty');
                    _day = 0;
                    flag = false;
                }

                if (this.isToday(_day)) {
                    CalendarCellI.addClass('today');
                }

                if (_day > 0) {
                    CalendarCellI.setContentDay(_day);
                }

                week.push(CalendarCellI);
            }
            firstIteration = false;
            result.push(week);
        }

        return result;
    }

    protected getClassForSelectedDays(day: number): string
    {
        let checkingDayTime = (new Date(this.year, this.month - 1, day)).getTime(),
            selectedTimes = [],
            result = '',
            min,
            max,
            maxIndex;

        this.selectedDays.forEach((DayDate) => {
            let selectedDay = DayDate.getDate(),
                month = DayDate.getMonth() + 1,
                year = DayDate.getFullYear();

            selectedTimes.push(DayDate.getTime());

            if (selectedDay === day && month === this.month && year === this.year) {
                result = 'jpicker-selected-day';
            }
        });

        if (result.length === 0) {
            if (selectedTimes.length < 2 && this.dayWithMouse !== null) {
                selectedTimes.push(this.dayWithMouse.getTime());
            }
            selectedTimes.sort();
            maxIndex = selectedTimes.length - 1;
            min = Tools.d(selectedTimes[0]) ? selectedTimes[0] : null;
            max = Tools.d(selectedTimes[maxIndex]) ? selectedTimes[maxIndex] : null;

            if (min !== null && max !== null && min < checkingDayTime && checkingDayTime < max) {
                result = 'jpicker-selected-range-day';
            }
        }

        return result;
    }

    protected getLabelsRow(): Array<CalendarCell>
    {
        let result = [];

        JPickerConfig.get().getWeeksDays().forEach((day) =>
        {
            result.push(
                (new CalendarCell).setContent(day).setClass('jpicker-label')
            );
        });

        return result;
    }

}
