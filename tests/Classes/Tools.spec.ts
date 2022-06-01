import { useProvider } from "test-data-provider";
import { Tools } from "../../src/Classes/Tools";

describe("Tests of Tools.u method", () => {
    useProvider(
        [
            //[argument, result]
            [undefined, true],
            [null, true],
            [false, false],
            [123, false],
            ["", false],
        ],
        (data) => {
            test(`Tools.u(${data[0]})`, () => {
                expect(Tools.u(data[0])).toBe(data[1]);
            });
        }
    );
});

describe("Tests of Tools.d method", () => {
    useProvider(
        [
            //[argument, result]
            [undefined, false],
            [null, false],
            [false, true],
            [123, true],
            ["", true],
        ],
        (data) => {
            test(`Tools.u(${data[0]})`, () => {
                expect(Tools.d(data[0])).toBe(data[1]);
            });
        }
    );
});
