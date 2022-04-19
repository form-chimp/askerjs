import _ from "lodash";


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
    constructor(required = false, onComplete, min = 0, placeholder = 'Enter Here') {

        this.element = document.createElement('textarea');
        this.element.placeholder = placeholder;
        this.required = required;
        this.minimum = min;

        let tailwindClasses = ['w-full', 'p-4', 'bg-gray-100', 'rounded', 'font-medium', 'text-gray-600', 'outline-none', 'focus:border-2', 'focus:border-blue-500', 'focus:shadow-lg', 'transition-all', 'duration-75'];
        this.element.classList.add(...tailwindClasses);

        this.element.addEventListener('keydown', () => {
            this.valid();
        });
    }

    /**
     * Render the textarea.
     * @returns {HTMLElement}
     */
    render() {
        return this.element;
    }

    /**
     * Get the value of the textarea.
     * @returns {String}
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
            if (_.trim(this.element.value).length === this.minimum) {
                this.element.classList.add('border-red-500','border-2');
                return false;
            }
            else {
                this.element.classList.remove('border-red-500','border-2');
                return true;
            }
        }
        else {
            return true;
        }
    }
}