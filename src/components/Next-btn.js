
/**
 * The Next button component.
 */
export default class NextBtn{

    /**
     * 
     * @param {Function} clicked The function to call when the button is clicked.
     * @param {Object} options The options for the button.
     */
    constructor(clicked = () => {},options = {}){

        this.options = options;
        this.clicked = clicked;

        this.element = document.createElement('button');

        let tailwindClasses = ['p-4','font-medium','text-gray-800'];

        this.element.classList.add(...tailwindClasses);


        if (this.options.text) {
            this.element.innerHTML = this.options.text;
        }else{
            this.element.innerHTML = 'Next';
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
     * Change the text of the button.
     * @param {String} text 
     */
    changeText(text){
        this.element.innerHTML = text;
    }

    
}