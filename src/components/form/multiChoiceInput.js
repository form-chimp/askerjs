import ChoiceInput from "./ChoiceInput.js";

export default class MultiChoiceInput extends ChoiceInput{

    constructor(question){
        super(question)

        this.singleChoice = false
    }

}