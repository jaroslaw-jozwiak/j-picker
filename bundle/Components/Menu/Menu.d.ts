import { Component } from "../Component";
import { HTMLEvent } from "../../Interface/HTMLEvent";
import { Event } from "../../Classes/Event";
import { JPickerConfig } from "../../Classes/JPickerConfig";
export declare class Menu extends Component {
    protected month: number;
    protected year: number;
    private event;
    private config;
    constructor(event: Event, config: JPickerConfig, month: number, year: number);
    setValues(month?: number, year?: number): Menu;
    protected refresh(): Menu;
    protected getEvents(): Array<HTMLEvent>;
    protected onArrayRightClick(that: Menu): () => void;
    protected onArrayLeftClick(that: Menu): () => void;
    protected onMonthClick(that: Menu): () => void;
    protected getMustacheVars(): Object;
    protected getMonthName(): string;
    protected getMustache(): any;
}
