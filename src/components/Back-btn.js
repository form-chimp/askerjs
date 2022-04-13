
/**
 * Back button component.
 */
export default class BackBtn{

    /**
     * 
     * @param {Function} clicked The function to call when the button is clicked.
     * @param {Object} options The options for the button.
     */
    constructor(clicked = () => {},options = {}){

        this.options = options;
        this.clicked = clicked;

        this.element = document.createElement('button');

        let tailwindClasses = ['p-4','text-gray-700'];

        this.element.classList.add(...tailwindClasses);


        if (this.options.text) {
            this.element.innerHTML = this.options.text;
        }else{
            this.element.innerHTML = 'Back';
        }

        this.element.addEventListener('click', () => {
            this.clicked();
        });
    }

    /**
     * Render the button.
     * @returns {HTMLElement}
     */
    render(){
        return this.element;
    }

    /**
     * 
     * @param {String} text The text to display.
     */
    changeText(text){
        this.element.innerHTML = text;
    }

    
}