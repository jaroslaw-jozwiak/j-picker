import {Component} from "../Component";
import {DOM} from "../../Classes/DOM";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {Event} from "../../Classes/Event";
import {VALUE_CLICK} from "../../Classes/EventsDict";

export class Value extends Component {

    protected date1: Date = null;

    protected dateOpacity1: boolean = false;

    protected date2: Date = null;

    protected dateOpacity2: boolean = false;

    private event: Event;

    public constructor(event: Event, date1: Date = null, date2: Date = null)
    {
        super();
        this.event = event;
        this.date1 = date1;
        this.date2 = date2;
    }

    public setDateOne(date1: Date): Value
    {
        this.date1 = date1;

        return this;
    }

    public setDateTwo(date2: Date): Value
    {
        this.date2 = date2;

        return this;
    }

    public setDateOneOpacity(dateOpacity1: boolean): Value
    {
        this.dateOpacity1 = dateOpacity1;

        return this;
    }

    public setDateTwoOpacity(dateOpacity2: boolean): Value
    {
        this.dateOpacity2 = dateOpacity2;

        return this;
    }

    public refresh(): Value
    {
        let HTMLElement = <HTMLDivElement>this.getHTMLElement(),
            DateOneElement = <HTMLDivElement>HTMLElement.querySelector('.jpicker-value-one'),
            opacityClass = 'jpicker-opacity',
            DateTwoElement;

        DateOneElement.innerText = this.getDateFormatted(this.date1);
        if (this.date2 !== null) {
            DateTwoElement = <HTMLDivElement>HTMLElement.querySelector('.jpicker-value-two')
            DateTwoElement.innerText = this.getDateFormatted(this.date2);
        }

        if (this.dateOpacity1) {
            (new DOM('.jpicker-value-one', HTMLElement)).addClass(opacityClass);
        } else {
            (new DOM('.jpicker-value-one', HTMLElement)).removeClass(opacityClass);
        }

        if (this.dateOpacity2) {
            (new DOM('.jpicker-value-two', HTMLElement)).addClass(opacityClass);
        } else {
            (new DOM('.jpicker-value-two', HTMLElement)).removeClass(opacityClass);
        }

        return this;
    }

    protected getDateFormatted(date: Date): string
    {
        if (date === null) {
            return '';
        }

        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        return this.getWithZero(day) + '.' + this.getWithZero(month) + '.' + year.toString();
    }

    protected getWithZero(value: number): string
    {
        return value < 10 ? '0' + value.toString() : value.toString();
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-value-one, .jpicker-value-two', 'click', this.onValueClick(this))
        ];
    }

    protected onValueClick(that: Value): Function
    {
        return function() {
            let ValueDate = that.date1,
                HTMLValueElement = <HTMLElement>this;

            if (HTMLValueElement.classList.contains('jpicker-opacity')) {
                return;
            }

            if (HTMLValueElement.classList.contains('jpicker-value-two')) {
                ValueDate = that.date2;
            }

            that.event.trigger(VALUE_CLICK, ValueDate);
        }
    }

    protected getMustacheVars(): Object
    {
        return {
            dateFormatted1: this.getDateFormatted(this.date1),
            dateFormatted2: this.getDateFormatted(this.date2),
            dateOpacity1: this.dateOpacity1,
            dateOpacity2: this.dateOpacity2,
            twoValues: this.date2 !== null
        };
    }

    protected getMustache(): any
    {
        return require('./Value.mustache');
    }

}
