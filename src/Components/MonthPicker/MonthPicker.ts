import {Picker} from "../Picker";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {ElementInterface} from "../../Interface/ElementInterface";
import {JPickerConfig} from "../../Classes/JPickerConfig";

export class MonthPicker extends Picker {

    protected month: number;

    public constructor(month: number)
    {
        super();
        this.month = month;
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-element', 'click', this.onMonthClick)
        ];
    }

    protected onMonthClick(): any {
        console.log(this, arguments);
    }

    protected getMustacheVars(): Object {
        return {
            elements: this.getMonths(),
            wrapperClass: 'jpicker-months-wrapper'
        };
    }

    protected getMonths(): Array<ElementInterface>
    {
        let months = JPickerConfig.get().getMonths(),
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
