import _ from 'lodash';
import ErrorHandler from '../Error-renderer';


/**
 * The Input component.
 */
export default class Input{

    /**
     * 
     * @param {String} type The type of input.
     * @param {Boolean} required Whether the input is required.
     * @param {Function} onComplete The function to call when the input is complete -- called when `Enter` is pressed.
     * @param {Number} min The minimum length of the input.
     * @param {Number} max The maximum length of the input.
     * @param {*} placeholder 
     */
    constructor(type = 'text', required = false, onComplete, min=0, max=10000, placeholder = 'Enter Here'){


        this.element = document.createElement('input');
        this.element.type = type;
        this.element.placeholder = placeholder;
        this.required = required;
        this.minimum = min;
        this.maximum = max

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