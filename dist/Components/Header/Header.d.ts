import { Component } from "../Component";
export declare class Header extends Component {
    protected title: string;
    protected description: string;
    constructor(title?: string, description?: string);
    protected getMustacheVars(): Object;
    protected getMustache(): any;
}
