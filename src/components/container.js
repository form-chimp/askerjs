
import gsap from "gsap";

/**
 * Container component. It is a wrapper for the entire form.
 */
export default class Container{
    /**
     * 
     * @param {HTMLElement} target The element to render the container to.
     */
    constructor(target){
        this.target = target;

        this.element = document.createElement('div');

        this.element.classList.add('asker_container');

        this.target.appendChild(this.element);
    }

    /**
     * Adds a new element to the container
     * @param {HTMLElement | String} element `HTMLElement` or `Template strings`
     */
    add(element){
       
        if (element instanceof HTMLElement) {
            this.element.appendChild(element);
        } else {
            this.element.innerHTML += element;
        }
    }

    /**
     * Removes all elements from the container.
     * Should be used with caution.
     */
    clear(){
        this.element.innerHTML = '';
        
    }
}