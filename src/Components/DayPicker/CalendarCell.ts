export class CalendarCell
{
    private cellClass: string = '';

    private attributes: Array<any> = [];

    private content: string = '';

    public getClass(): string
    {
        return this.cellClass;
    }

    public getLabel(): string
    {
        return this.content;
    }

    public setClass(_class: string): CalendarCell
    {
        this.cellClass = _class;

        return this;
    }

    public addClass(_class: string): CalendarCell
    {
        this.cellClass += ' ' + _class;

        return this;
    }

    public setContent(content: string): CalendarCell
    {
        this.content = content;

        return this;
    }

    public setContentDay(day: number): CalendarCell
    {
        this.content = day.toString();

        return this;
    }

    public addAttribute(name: string, value: any): CalendarCell
    {
        this.attributes.push('data-' + name + '=' + value);
        return this;
    }

}
