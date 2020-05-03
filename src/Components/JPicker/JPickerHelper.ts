import {JPicker} from "./JPicker";
import {JPickerConfig} from "../../Classes/JPickerConfig";

export abstract class JPickerHelper {

    protected JPickerI: JPicker;

    protected JPickerConfigI: JPickerConfig;

    public constructor(JPickerI: JPicker)
    {
        this.JPickerI = JPickerI;
        this.JPickerConfigI = JPickerConfig.get();
    }

}
