import {Component} from "../Component";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {Event} from "../../Classes/Event";
import {NEXT_MONTH_CLICK, PREV_MONTH_CLICK, MENU_MONTH_CLICK} from "../../Classes/EventsDict";
import {JPickerConfig} from "../../Classes/JPickerConfig";

export class Menu extends Component
{
    protected month: number;

    protected year: number;

    public constructor(month: number, year: number)
    {
        super();
        this.month = month;
        this.year = year;
    }


    public setValues(month: number = null, year: number = null): Menu
    {
        if (month !== null) {
            this.month = month;
        }
        if (year !== null) {
            this.year = year;
        }

        return this.refresh();
    }

    protected refresh(): Menu
    {
        let Wrapper = this.getHTMLElement(),
            MonthWrapper = <HTMLDivElement>Wrapper.querySelector('.jpicker-menu-month'),
            YearInput = <HTMLInputElement>Wrapper.querySelector('.jpicker-menu-year-value');

        MonthWrapper.innerText = this.getMonthName();
        YearInput.value = this.year.toString();

        return this;
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-arrow-right', 'click', this.onArrayRightClick),
            this.getEventObject('.jpicker-arrow-left', 'click', this.onArrayLeftClick),
            this.getEventObject('.jpicker-menu-month', 'click', this.onMonthClick)
        ];
    }

    protected onArrayRightClick()
    {
        Event.get().trigger(NEXT_MONTH_CLICK);
    }

    protected onArrayLeftClick()
    {
        Event.get().trigger(PREV_MONTH_CLICK);
    }

    protected onMonthClick()
    {
        Event.get().trigger(MENU_MONTH_CLICK);
    }

    protected getMustacheVars(): Object
    {
        return {
            monthName: this.getMonthName(),
            year: this.year
        };
    }

    protected getMonthName(): string
    {
        return JPickerConfig.get().getMonths()[this.month - 1];
    }

    protected getMustache(): any
    {
        return require('./Menu.mustache');
    }

}
