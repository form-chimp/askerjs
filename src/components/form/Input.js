import _ from 'lodash';
import ErrorHandler from '../error-renderer.js';


/**
 * The Input component.
 */
export default class Input{

    /**
     * 
     * @param {object} question Question object
     * @param {Function} onComplete Callback for when it's completed.
     */
    constructor(question, onComplete){


        this.element = document.createElement('input');
        this.element.placeholder = question.placeholder || "Enter Here";
        this.required = question.required || false;
        this.minimum = question.min || 0;
        this.maximum = question.max || 1000

        this.container = document.createElement('div');
        this.container.classList.add('w-full');

    
        this.element.classList.add('asker_input');

        this.element.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {
                //console.log(this.valid());
                //console.log(this.getValue());
                onComplete(this.getValue());
            }
        });
        this.container.appendChild(this.element);
    }

    /**
     * 
     * @returns {HTMLElement} The input element.
     */
    render(){
        return this.container;
    }

    /**
     * 
     * @returns {String | undefined} The value of the input.
     */
    getValue(){

        if(this.valid()){

            if (this.element.value.length === 0) {
                return ' ';
            }
            
            return this.element.value;
        }
    }

    /**
     * Checks if the input is valid.
     * Primarily checks if the input is required and if it is empty.
     * @returns {Boolean} Whether the input is valid or not.
     */
    valid(){
        if(this.required){
            
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
        }else{
            return true;
        }
    }
}