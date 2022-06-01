import { Component } from "../Component";
import { HTMLEvent } from "../../Interface/HTMLEvent";
export declare class Menu extends Component {
    protected month: number;
    protected year: number;
    constructor(month: number, year: number);
    setValues(month?: number, year?: number): Menu;
    protected refresh(): Menu;
    protected getEvents(): Array<HTMLEvent>;
    protected onArrayRightClick(): void;
    protected onArrayLeftClick(): void;
    protected onMonthClick(): void;
    protected getMustacheVars(): Object;
    protected getMonthName(): string;
    protected getMustache(): any;
}
