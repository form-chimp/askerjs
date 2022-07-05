import _ from "lodash";
import ErrorHandler from "../Error-renderer";


/**
 * @class Textarea
 * 
 */
export default class Textarea {

    /**
     * 
     * @param {Boolean} required Whether the field is required or not.
     * @param {Function} onComplete Function to call when complete.
     * @param {Number} min Minimum length of the field.
     * @param {String} placeholder Placeholder text.
     */
    constructor(required = false, onComplete, min = 0, max = 1000000, placeholder = 'Enter Here') {

        this.element = document.createElement('textarea');
        this.element.placeholder = placeholder;
        this.required = required;
        this.minimum = min;
        this.maximum = max
        this.container = document.createElement('div');
        this.container.classList.add('w-full');

        let tailwindClasses = ['w-full', 'p-4', 'bg-gray-100', 'rounded', 'font-medium', 'text-gray-600', 'outline-none', 'focus:border-2', 'focus:border-blue-500', 'focus:shadow-lg', 'transition-all', 'duration-75'];
        this.element.classList.add(...tailwindClasses);

        

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