
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

        this.element.classList.add('asker_back-btn');


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