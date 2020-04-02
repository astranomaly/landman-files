class Helper{
    /**
     * Animation frame timer
     */
    public afTimer(): Promise<number> {
        return new Promise((resolve) => {
            requestAnimationFrame(resolve);
        });
    }

    /**
     * Checks to see if an element exists, then resolves a promise when it exists
     */
    public async elemLoad(selector: string): Promise<HTMLElement> {
        // Select the actual element
        const elem: HTMLElement | null = document.querySelector(selector);
        if (elem === undefined) {
            throw `${selector} is undefined!`;
        }
        if (elem === null) {
            await this.afTimer();
            return await this.elemLoad(selector);
        } else {
            return elem;
        }
    }

    /**
     * Checks to see if an element is in the viewport
     */
    public async inViewport( elem:Element|null ):Promise<boolean> {
        if(elem === null){
            return Promise.reject(`elem is void: ${elem}`);
        }else{
            const bounds: ClientRect | DOMRect = elem.getBoundingClientRect();
            return (
                bounds.top >= 0 &&
                bounds.left >= 0 &&
                bounds.right <= this.windowWidth() &&
                bounds.bottom <= this.windowHeight()
            );
        }
    }

    /**
     * Returns the width of the viewport
     */
    public windowWidth():number {
        return Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        );
    }

    /**
     * Returns the height of the viewport
     */
    public windowHeight(): number {
        return Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        );
    }

    /**
     * Converts REM unites to pixels
     */
    public remToPixel( rem:number ):number {
        return rem * parseFloat( getComputedStyle(document.documentElement).fontSize || "16" );
    }
}
