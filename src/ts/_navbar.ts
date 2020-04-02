class Navbar{
    public createNav():void {
        const nav: HTMLElement = <HTMLElement>document.querySelector('#nav');
        const menu: HTMLUListElement = <HTMLUListElement>document.querySelector('#menu');
        const menuToggle: HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('.nav__toggle');
        let isMenuOpen: boolean = false;


        // TOGGLE MENU ACTIVE STATE
        menuToggle.addEventListener('click', e => {
            e.preventDefault();
            isMenuOpen = !isMenuOpen;

            // toggle a11y attributes and active class
            menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
            menu.hidden = !isMenuOpen;
            nav.classList.toggle('nav--open');
        });


        // TRAP TAB INSIDE NAV WHEN OPEN
        nav.addEventListener('keydown', e => {
            // abort if menu isn't open or modifier keys are pressed
            if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            // listen for tab press and move focus
            // if we're on either end of the navigation
            const menuLinks: NodeListOf<HTMLAnchorElement> = menu.querySelectorAll('.nav__link');
            if (e.keyCode === 9) {
                if (e.shiftKey) {
                    if (document.activeElement === menuLinks[0]) {
                        menuToggle.focus();
                        e.preventDefault();
                    }
                } else if (document.activeElement === menuToggle) {
                    menuLinks[0].focus();
                    e.preventDefault();
                }
            }
        });
    }
}
