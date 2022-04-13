import _ from 'lodash';


class Choice{
    /**
     * 
     * @param {Object | String} choice 
     */
    constructor(choice){

        this.choice = choice;

        if(typeof choice === 'string'){
            this.choice = {
                label: choice,
                selected: false
            };

            this.label = this.choice.label;
            this.selected = this.choice.selected;
        }else{
            this.label = this.choice.label;
            this.selected = this.choice.selected || false;
        }


        this.element = document.createElement('div');
        let tailwindClasses = ['p-4', 'mb-4', 'bg-gray-100', 'font-medium', 'rounded', 'flex', 'flex-wrap','items-center','gap-4', 'cursor-pointer',]
        this.element.classList.add(...tailwindClasses);

        this.selectedIcon = document.createElement('div');
        let iconTailwindClasses = ['w-6', 'h-6', 'rounded-full', 'border-gray-500', 'border-2', 'transition-all', 'duration-100'];
        this.selectedIcon.classList.add(...iconTailwindClasses);

        this.labelElement = document.createElement('div');
        this.labelElement.innerHTML = this.label;
        this.labelElement.classList.add('font-medium', 'text-gray-600');

        this.element.appendChild(this.selectedIcon);
        this.element.appendChild(this.labelElement);

    }

    render(){     
        return this.element;
    }

    /**
     * Selects the choice.
     * @returns {Object} The choice object.
     */
    select(){

        this.choice.selected = true;
        this.selectedIcon.classList.add('bg-gray-500');
        return this.choice;
    }

    /**
     * Unselects the choice.
     * @returns {Object} The choice object.
     */
    unselect(){
        this.choice.selected = false;
        this.selectedIcon.classList.remove('bg-gray-500');
        return this.choice;
    }
}


/**
 * Choice input component.
 */
export default class ChoiceInput{

    /**
     * 
     * @param {Boolean} singleChoice Whether the input should only allow one choice.
     * @param {Boolean} required Whether the input should be required.
     * @param {Array} choices The choices to choose from.
     */
    constructor(singleChoice = true, required = false, choices = []){

        this.choices = choices;
        this.singleChoice = singleChoice;
        this.required = required;

        this.container = document.createElement('div');

        let tailwindClasses = ['w-full', 'flex','flex-col','gap-3'];
        this.container.classList.add(...tailwindClasses);

        this.chosen = [];
        let allChoiceElements =[]

        this.choices.forEach(choice => {
            
            let choiceElement = new Choice(choice);
            this.container.appendChild(choiceElement.render());
            allChoiceElements.push(choiceElement);
            

            choiceElement.element.addEventListener('click', () => {
   
                if(this.singleChoice){
                    allChoiceElements.forEach(element => {
                        element.unselect();
                    });
                    this.chosen = [];
                }
                
                if(choiceElement.choice.selected){
                    let choice = choiceElement.unselect();
                    this.chosen = _.without(this.chosen, choice);
                }else{
                    let choice = choiceElement.select();
                    this.chosen.push(choice);
                }

            });
        });
    }

    /**
     * Render the input.
     * @returns {HTMLElement} 
     */
    render(){
        return this.container;
    }


    /**
     * Returns the value of the input.
     * @returns {Array} The chosen choices.
     */
    getValue(){
        
        if (this.valid()) {
            return this.chosen;
        }
    }

    /**
     * Checks if the input is valid.
     * Primarily checks if the input is `required`.
     * @returns {Boolean} True if the input is valid.
     */
    valid(){
        if(this.required){
            if(this.chosen.length === 0){
                return false;
            }
        }
        return true;
    }
}