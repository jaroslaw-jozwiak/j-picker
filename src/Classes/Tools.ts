export class Tools {

    public static getDate(value: any, _default: Date = null): Date
    {
        if (typeof value === 'number') {
            return new Date(value * 1000);
        } else if (value instanceof Date) {
            return value;
        }

        return _default;
    }

    public static isDate(value: any): boolean
    {
        return value instanceof Date;
    }

    public static isArray(value: any): boolean
    {
        return value instanceof Array;
    }

    public static isNumber(value: any): boolean
    {
        return typeof value === 'number';
    }

    public static isString(value: any): boolean
    {
        return typeof value === 'string';
    }

    public static isFunction(value: any): boolean
    {
        return typeof value === 'function';
    }

    public static int(value: any): number
    {
        return parseInt(value, 10) || 0;
    }

    public static error(message: string, checkDocs: boolean = true)
    {
        message += '.';
        if (checkDocs) {
            message += ' Check documentation: https://jpicker.com/docs'
        }

        throw new Error(message);
    }

    public static d(value: any)
    {
        return typeof value !== 'undefined' && value !== null;
    }

    public static u(value: any)
    {
        return !Tools.d(value);
    }

}
