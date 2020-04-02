/// <reference path="./_helpers.ts" />
/// <reference path="./_navbar.ts" />
/// <reference path="./_slideshow.ts" />

declare var smoothscroll:any;

const helper = new Helper();
const nav = new Navbar();

helper.elemLoad('body')
.then( () => {
    // Build the navbar
    nav.createNav();

    // Show/hide small logo
    const logo:Element|null = document.querySelector('#logo');
    const smLogo:HTMLElement|null = document.getElementById('small-logo');
    if(smLogo === null){
        throw "smLogo is null";
    }else{
        smLogo.style.opacity = '0';
        smLogo.style.transition = '0.3s all';
        // Check if main logo leaves viewport
        window.addEventListener('scroll', (e) => {
            helper.inViewport(logo)
                .then((result) => {
                    if (result === true && smLogo.style.opacity === '1') {
                        smLogo.style.opacity = '0';
                    } else if (result === false && smLogo.style.opacity === '0') {
                        smLogo.style.opacity = '1';
                    }
                });
        });
    }

    // Setup smooth scrolling
    const navNodes:NodeListOf<HTMLAnchorElement>|null = document.querySelectorAll( '.nav__item > a' );

    navNodes.forEach( link => {
        link.addEventListener( 'click', e => {
            e.preventDefault();
            let tar:HTMLElement|null = document.querySelector( link.getAttribute('href') || '#' );
            if(tar !== null){
                window.scroll({
                    top: tar.offsetTop - helper.remToPixel(5),
                    behavior: "smooth",
                });
            }
        } );
    } );
} );

// Wait for external scripts to load
window.addEventListener('load', () => {
    const slide = new Slideshow();
    slide;

    smoothscroll.polyfill();
});
