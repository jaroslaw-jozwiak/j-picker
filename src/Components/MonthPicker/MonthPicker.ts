import { MONTH_CLICK } from './../../Classes/EventsDict';
import {Picker} from "../Picker";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {ElementInterface} from "../../Interface/ElementInterface";
import {JPickerConfig} from "../../Classes/JPickerConfig";
import { Event } from '../../Classes/Event';
import { Tools } from '../../Classes/Tools';

export class MonthPicker extends Picker {

    protected month: number;

    private event: Event;

    private config: JPickerConfig;

    public constructor(event: Event, config: JPickerConfig, month: number)
    {
        super();
        this.event = event;
        this.config = config;
        this.month = month;
    }

    public setMonth(month: number): MonthPicker
    {
        this.month = month;

        return this;
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-element', 'click', this.onMonthClick(this))
        ];
    }

    protected onMonthClick(that: MonthPicker): any {
        return function(EventData: MouseEvent) {
            let month = (<HTMLElement>this).getAttribute('data-key'),
                monthConverted = Tools.int(month);

                that.event.trigger(MONTH_CLICK, monthConverted);
           }  
    }

    protected getMustacheVars(): Object {
        return {
            elements: this.getMonths(),
            wrapperClass: 'jpicker-months-wrapper jpicker-hidden'
        };
    }

    protected getMonths(): Array<ElementInterface>
    {
        let months = this.config.getMonths(),
            number = 1,
            result = [];

        months.forEach((monthName) => {
            result.push({
                key: number,
                name: monthName,
                selected: this.month === number
            });
            number++;
        });

        return result;
    }

    protected getMustache(): any {
        return require('../List/List.mustache');
    }

}
