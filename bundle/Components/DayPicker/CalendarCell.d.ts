export declare class CalendarCell {
    private cellClass;
    private attributes;
    private content;
    getClass(): string;
    getLabel(): string;
    setClass(_class: string): CalendarCell;
    addClass(_class: string): CalendarCell;
    setContent(content: string): CalendarCell;
    setContentDay(day: number): CalendarCell;
    addAttribute(name: string, value: any): CalendarCell;
}
