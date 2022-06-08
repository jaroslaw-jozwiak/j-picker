import { Component } from "../Component";
import { JPickerConfig } from "../../Classes/JPickerConfig";
import { RangeInterface } from "../../Interface/RangeInterface";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { Event } from "../../Classes/Event";
export declare class Ranges extends Component {
    protected ranges: Array<RangeInterface>;
    private event;
    private config;
    constructor(event: Event, config: JPickerConfig);
    protected getEvents(): Array<HTMLEvent>;
    protected onRangeClick(that: Ranges): () => void;
    protected getMustacheVars(): Object;
    protected getMustache(): any;
}
