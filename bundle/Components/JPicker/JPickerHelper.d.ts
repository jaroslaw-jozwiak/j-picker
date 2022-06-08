import { JPicker } from "./JPicker";
import { JPickerConfig } from "../../Classes/JPickerConfig";
import { Event } from "../../Classes/Event";
export declare abstract class JPickerHelper {
    protected JPickerI: JPicker;
    protected config: JPickerConfig;
    protected event: Event;
    constructor(JPickerI: JPicker, event: Event, config: JPickerConfig);
}
