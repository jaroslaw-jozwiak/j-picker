import {Component} from "../Component";

export class Header extends Component {

    protected title: string;

    protected description: string;

    public constructor(title: string = '', description: string = '') {
        super();
        this.title = title;
        this.description = description;
    }

    protected getMustacheVars(): Object {
        return {
            title: this.title,
            description: this.description
        }
    }

    protected getMustache(): any
    {
        return require('./Header.mustache');
    }

}
