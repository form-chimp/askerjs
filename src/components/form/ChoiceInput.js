import _ from 'lodash';


class Choice{
    /**
     * 
     * @param {Object | String} choice 
     */
    constructor(choice, single=true){

        this.choice = choice;
        this.single = single; // whether the user can select one choice. this variable will be used for styling. 

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
        
        this.element.classList.add('asker_choice');

        this.selectedIcon = document.createElement('div');
        
        this.selectedIcon.classList.add('asker_select-icon');

        this.labelElement = document.createElement('div');
        this.labelElement.innerHTML = this.label;

        this.element.appendChild(this.selectedIcon);
        this.element.appendChild(this.labelElement);

        if(!this.single){
            this.selectedIcon.classList.remove('box')
            //this.selectedIcon.classList.add('rounded')
        }
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
        this.selectedIcon.classList.add('selected');

        
        this.selectedIcon.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
        <path d="M2.00003 6.6066L8.01043 12.617L18.617 2.01041" stroke="#F9FAFB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`

        return this.choice;
    }

    /**
     * Unselects the choice.
     * @returns {Object} The choice object.
     */
    unselect(){
        this.choice.selected = false;
        this.selectedIcon.classList.remove('selected');
        this.selectedIcon.innerHTML=``
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

        this.container.classList.add('asker_choices-container');

        this.chosen = [];
        let allChoiceElements =[]

        this.choices.forEach(choice => {
            
            let choiceElement = new Choice(choice, this.singleChoice);
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