import {JPicker} from "./JPicker";
import {JPickerConfig} from "../../Classes/JPickerConfig";
import { Event } from "../../Classes/Event";

export abstract class JPickerHelper {

    protected JPickerI: JPicker;

    protected config: JPickerConfig;

    protected event: Event;

    public constructor(JPickerI: JPicker,  event: Event, config: JPickerConfig)
    {
        this.JPickerI = JPickerI;
        this.event = event;
        this.config = config;
    }

}
