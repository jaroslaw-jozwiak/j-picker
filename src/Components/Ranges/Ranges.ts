import {Component} from "../Component";
import {JPickerConfig} from "../../Classes/JPickerConfig";
import {RangeInterface} from "../../Interface/RangeInterface";
import {HTMLEvent} from "../../Interface/HTMLEvent";
import {Tools} from "../../Classes/Tools";
import {Event} from "../../Classes/Event";
import {RANGE_CLICK} from "../../Classes/EventsDict";

export class Ranges extends Component {

    protected ranges: Array<RangeInterface>;

    private event: Event;

    private config: JPickerConfig;

    public constructor(event: Event, config: JPickerConfig)
    {
        super();
        this.event = event;
        this.config = config;
        this.ranges = this.config.getRangesSet();
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

            that.event.trigger(RANGE_CLICK, range[0], range[1]);
        }
    }

    protected getMustacheVars(): Object {
        return {
            title: this.config.getRangesTitle(),
            ranges: this.ranges
        };
    }

    protected getMustache(): any
    {
        return require('./Ranges.mustache');
    }

}
