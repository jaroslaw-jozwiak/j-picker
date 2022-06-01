import { DOM } from "../../src/Classes/DOM";

describe("DOM class tests", () => {
    test("Test of setting classes", () => {
        document.body.innerHTML =
            '<div id="test-wrapper">' +
            '  <div class="inside-wrapper">Text</div>' +
            '  <div class="other-wrapper">Other</div>' +
            "</div>";

        const dom = new DOM(
            ".inside-wrapper",
            document.getElementById("test-wrapper")
        );

        dom.addClass("classA");
        dom.addClass("classB");
        dom.removeClass("classB");

        const insideWrapper = document.querySelector(".inside-wrapper");

        expect(insideWrapper.classList.contains("classA")).toBe(true);
        expect(insideWrapper.classList.contains("classB")).toBe(false);
    });

    test("Test of setting and getting html", () => {
        document.body.innerHTML =
            '<div id="test-wrapper">' +
            '  <div class="inside-wrapper">Text</div>' +
            '  <div class="other-wrapper">Other</div>' +
            "</div>";

        const dom = new DOM(
            ".inside-wrapper",
            document.getElementById("test-wrapper")
        );

        expect(dom.html()).toBe("Text");
        dom.html("<span>Value</span>");
        expect(dom.html()).toBe("<span>Value</span>");
    });
});
