
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

        let tailwindClasses = ['text-4xl','text-gray-800','capitalize', 'font-medium'];

        this.element.classList.add(...tailwindClasses);

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