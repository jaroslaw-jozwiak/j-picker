import {Picker} from "../Picker";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {ElementInterface} from "../../Interface/ElementInterface";

export class YearPicker extends Picker {

    protected year: number;

    public constructor(year: number = null)
    {
        super();
        this.year = year;
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-element', 'click', this.onYearClick)
        ];
    }

    protected onYearClick(): any {
        console.log(this, arguments);
    }

    protected getMustacheVars(): Object {
        return {
            elements: this.getYears(),
            wrapperClass: 'jpicker-years-wrapper'
        };
    }

    protected getYears(): Array<ElementInterface>
    {
        let currentYear = this.year || this.getCurrentYear(),
            minYear = currentYear - 7,
            maxYear = currentYear + 7,
            result = [];

        for (let year = minYear; year <= maxYear; year++) {
            result.push({
                key: year,
                name: year,
                selected: currentYear === year
            });
        }

        return result;
    }

    protected getCurrentYear(): number {
        return (new Date).getFullYear();
    }

    protected getMustache(): any {
        return require('../List/List.mustache');
    }

}
