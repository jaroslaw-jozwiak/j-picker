export declare class DOM {
    protected wrapper: Array<HTMLElement>;
    constructor(selector: string | HTMLElement, target?: HTMLElement | Document);
    get(): HTMLElement;
    html(html?: string): string;
    addClass(_class: string): HTMLElement;
    removeClass(_class: string): HTMLElement;
    setClasses(Wrapper: HTMLElement, classes: Array<string>): HTMLElement;
}
