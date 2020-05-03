export class DOM {

    protected wrapper: Array<HTMLElement> = [];

    constructor(selector: string | HTMLElement, target: HTMLElement | Document = document) {
        if (typeof selector === 'string') {
            target.querySelectorAll(selector).forEach((NodeElement) => {
                this.wrapper.push(<HTMLElement>NodeElement);
            });
        } else {
            this.wrapper = [selector];
        }
    }

    get(): HTMLElement
    {
        return this.wrapper[0];
    }

    html(html: string = null): string
    {
        let response = this.wrapper[0] ? this.wrapper[0].innerHTML : null;

        this.wrapper.forEach((WrapperTmp: HTMLElement) => {
            if (html !== null) {
                WrapperTmp.innerHTML = html;
            }
        });

        return response;
    }

    addClass(_class: string): HTMLElement
    {
        this.wrapper.forEach((WrapperTmp: HTMLElement) => {
            let finalClasses = [];
            WrapperTmp.classList.forEach((_classTmp) => {
                finalClasses.push(_classTmp);
            });
            finalClasses.push(_class);
            this.setClasses(WrapperTmp, finalClasses);
        });

        return this.wrapper[0] || null;
    }

    removeClass(_class: string): HTMLElement
    {
        this.wrapper.forEach((WrapperTmp: HTMLElement) => {
            let finalClasses = [];
            WrapperTmp.classList.forEach((_classTmp) => {
                _class !== _classTmp && finalClasses.push(_classTmp);
            });
            this.setClasses(WrapperTmp, finalClasses);
        });

        return this.wrapper[0] || null;
    }

    setClasses(Wrapper: HTMLElement, classes: Array<string>)
    {
        Wrapper.className = classes.join(' ');

        return Wrapper;
    }

}
