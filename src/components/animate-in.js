import gsap from "gsap";

export default class AnimateIn{
    /**
     * Element that will animate into the screen.
     * @param {HTMLElement | String} element `HTMLElement` or `Template strings`
     * @param {Number} xOffset `Number` of pixels to offset the element.
     */
    constructor(element, xOffset = 20){
        this.element = element;

        this.container = document.createElement('div');

        if (element instanceof HTMLElement) {
            this.container.appendChild(element);
        } else {
            this.container.innerHTML += element;
        }

        gsap.from(this.container, {
            opacity: 0, 
            x: xOffset , 
            duration: .3
        });

    
    }
    render(){
        return this.container;
    }
}