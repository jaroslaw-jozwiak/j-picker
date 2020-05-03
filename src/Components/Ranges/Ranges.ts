import {Component} from "../Component";
import {JPickerConfig} from "../../Classes/JPickerConfig";
import {RangeInterface} from "../../Interface/RangeInterface";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {Tools} from "../../Classes/Tools";
import {Event} from "../../Classes/Event";
import {RANGE_CLICK} from "../../Classes/EventsDict";

export class Ranges extends Component {

    protected ranges: Array<RangeInterface>;

    public constructor() {
        super();
        this.ranges = JPickerConfig.get().getRangesSet();
        this.ranges.forEach((v: RangeInterface, key: number) => {
            v.id = key;
        });
    }

    protected getEvents(): Array<HTMLEvent> {
        return [
            this.getEventObject('.jpicker-range', 'click', this.onRangeClick(this))
        ];
    }

    protected onRangeClick(that: Ranges)
    {
        return function() {
            let key = (<HTMLElement>this).getAttribute('data-key'),
                keyInt = Tools.int(key),
                range = that.ranges[keyInt].range;

            Event.get().trigger(RANGE_CLICK, range[0], range[1]);
        }
    }

    protected getMustacheVars(): Object {
        return {
            title: JPickerConfig.get().getRangesTitle(),
            ranges: this.ranges
        };
    }

    protected getMustache(): any
    {
        return require('./Ranges.mustache');
    }

}
