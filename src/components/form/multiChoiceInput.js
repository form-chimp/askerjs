import ChoiceInput from "./choiceInput.js";

export default class MultiChoiceInput extends ChoiceInput{

    constructor(required = false, choices = [], other=false){
        super(false,required,choices,other)

    }

}