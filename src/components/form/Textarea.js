import _ from "lodash";
import ErrorHandler from "../error-renderer.js";


/**
 * @class Textarea
 * 
 */
export default class Textarea {

    /**
     * 
     * @param {object} question Question object
     * @param {Function} onComplete Callback for when it's complete.
     */
    constructor(question,onComplete) {

        this.element = document.createElement('textarea');
        this.element.placeholder = question.placeholder || "Enter Here";
        this.required = question.required || false;
        this.minimum = question.min || 0;
        this.maximum = question.max || 1000000
        this.container = document.createElement('div');
        this.container.classList.add('w-full');

        
        this.element.classList.add('asker_textarea');

        

        this.element.addEventListener('keydown', () => {
            //this.valid();
        });
        this.container.appendChild(this.element)
    }

    /**
     * Render the textarea.
     * @returns {HTMLElement}
     */
    render() {
        return this.container;
    }

    /**
     * Get the value of the textarea.
     * @returns {String | undefined}
     */
    getValue() {
            
            if (this.valid()) {
    
                if (this.element.value.length === 0) {
                    return ' ';
                }
    
                return this.element.value;
            }
        }

    
    /**
     * Check if the textarea is valid.
     * @returns {Boolean}
     */
    valid() {
        if (this.required) {
            if(_.trim(this.element.value).length >= this.minimum){

                if(_.trim(this.element.value).length <= this.maximum){

                    this.element.classList.remove('focus:border-red-500','border-2','border-red-500');
                    return true;
                }else{
                    this.element.classList.add('focus:border-red-500','border-2','border-red-500');
                    new ErrorHandler(this.container,'Maximum length is ' + this.maximum);
                    return false;
                }

                
            }else{ 

                this.element.classList.add('focus:border-red-500','border-2','border-red-500');
                new ErrorHandler(this.container,`Response must be at least ${this.minimum} characters long.`);
                return false;
                    
            }
        }else {
            return true;
        }
    }
}