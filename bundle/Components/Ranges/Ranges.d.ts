import { Component } from "../Component";
import { RangeInterface } from "../../Interface/RangeInterface";
import { HTMLEvent } from "../../Interface/HTMLEvent";
export declare class Ranges extends Component {
    protected ranges: Array<RangeInterface>;
    constructor();
    protected getEvents(): Array<HTMLEvent>;
    protected onRangeClick(that: Ranges): () => void;
    protected getMustacheVars(): Object;
    protected getMustache(): any;
}
