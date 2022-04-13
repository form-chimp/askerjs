import _ from 'lodash';


/**
 * The Input component.
 */
export default class Input{

    /**
     * 
     * @param {String} type The type of input.
     * @param {Boolean} required Whether the input is required.
     * @param {Function} onComplete The function to call when the input is complete -- called when `Enter` is pressed.
     * @param {*} placeholder 
     */
    constructor(type = 'text', required = false, onComplete, placeholder = 'Enter Here'){


        this.element = document.createElement('input');
        this.element.type = type;
        this.element.placeholder = placeholder;
        this.required = required;



        let tailwindClasses = ['w-full', 'p-4', 'bg-gray-100', 'rounded', 'font-medium', 'text-gray-600', 'outline-none', 'focus:border-2', 'focus:border-blue-500', 'focus:shadow-lg', 'transition-all', 'duration-75'];
        this.element.classList.add(...tailwindClasses);

        this.element.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {
                //console.log(this.valid());
                //console.log(this.getValue());
                onComplete(this.getValue());
            }
        });
    }

    /**
     * 
     * @returns {HTMLElement} The input element.
     */
    render(){
        return this.element;
    }

    /**
     * 
     * @returns {String} The value of the input.
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
            
            if(_.trim(this.element.value).length === 0){
                this.element.classList.add('focus:border-red-500','border-2','border-red-500');
                return false;
            }else{ 

                this.element.classList.remove('focus:border-red-500','border-2','border-red-500');
                return true;
                    
            }
        }else{
            return true;
        }
    }
}