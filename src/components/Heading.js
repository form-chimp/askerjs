
/**
 * Heading component.
 */
export default class Heading{

    /**
     * 
     * @param {String} text The text to display.
     */
    constructor(text){

        this.text = text;

        this.element = document.createElement('h1');

        this.element.classList.add('asker_heading');

        this.element.innerText = this.text;
    }

    /**
     * Render the heading.
     * @returns {HTMLElement} 
     */
    render(){
        return this.element;
    }
}