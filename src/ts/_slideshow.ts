declare var Flickity: any;

class Slideshow {
    private _elem: HTMLElement | null = document.querySelector('.slideshow');
    private _options: Object = {
        wrapAround: true,
        freeScroll: false,
        // groupCells: true,
        autoPlay: 4000,
        imagesLoaded: true,
        lazyLoad: 2,
        accessibility: true,
        setGallerySize: false,
        cellAlign: "center",
        prevNextButtons: false,
        pageDots: false,
        percentPosition: false,
    }
    private _imgData: Object = {
        excavation: 6,
        demolition: 2,
        retaining: 4,
        screws: 2,
        acreage: 5,
        trucking: 4,
        landscaping: 3,
    }

    constructor() {
        new Promise((resolve, reject) => {
            if (this._elem === null) {
                Promise.reject("slideshow is null");
            } else {
                Promise.resolve(this._init());
            }
        });

    }

    private async _init() {

        const data: Object = this._imgData;
        // Loop over the list of image types
        await Object.entries(data).forEach(([key, val]) => {
            // Iterate based on the value required
            for (let i = 1; i <= val; i++) {
                let slide: string = this._generate(key, i);
                this._elem!.innerHTML += slide;
            }
        });
        // Start the slideshow
        this._start();
    }

    private _generate(name: string, id: number): string {
        return `<div class="slide ${name}">
                <img src="./asset/img/slides/${name}${id}_th.jpg" data-flickity-lazyload="./asset/img/slides/${name}${id}_full.jpg" />
            </div>`;
    }

    private _start(): any {
        let flick: any = new Flickity(this._elem!, this._options);
        return flick;
    }
}
