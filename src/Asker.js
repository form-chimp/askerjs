
import AnimateIn from "./components/animate-in";
import Container from "./components/container";
import Heading from "./components/heading";
import Input from "./components/form/input";
import ChoiceInput from "./components/form/choiceInput";
import NextBtn from "./components/Next-btn";
import BackBtn from "./components/Back-btn";


export default class Asker {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {Array | JSON | Object} questions 
     * @param {Object} options 
     */
    constructor(target,questions,onComplete, options){

        this.questions = questions;
        this.onComplete = onComplete;


        /** TODO: Get the target element */

        if (target instanceof HTMLElement) {
            this.target = target;
        } else {
            throw new Error('The target is not a valid HTMLElement');
        }

        this.container = new Container(this.target);



        this.formTimeline = [];

    }


    /**
     * Render the question.
     * @param {Object} question The question object
     */
    ask(question){

        this.container.clear();

       this.container.add(
            new AnimateIn(
                new Heading(question.text).render()
            ).render()
        );

        switch (question.type) {

            case 'singleChoice':

                let singleChoiceInput = new ChoiceInput(true, question.required, question.choices);
    
                this.container.add(
                    new AnimateIn(
                        singleChoiceInput.render()
                    ).render()
                )
                
                this.container.add(
                    new AnimateIn(
                        this.initFormControl(question, singleChoiceInput)
                    ).render()
                )


                break;

            case 'multipleChoice':

                let multipleChoiceInput = new ChoiceInput(false, question.required, question.choices);

                this.container.add(
                    new AnimateIn(
                        multipleChoiceInput.render()
                    ).render()
                )

                this.container.add(
                    new AnimateIn(
                        this.initFormControl(question, multipleChoiceInput)
                    ).render()
                )
                break;

                
            case 'text':

                let textInput = new Input('text',question.required, (value) => {
                    if(value){
                        question.value = value;
                        this.nextQuestion(question);
                    }
                });
                

                this.container.add(
                    new AnimateIn(
                        textInput.render()
                    ).render()
                )

                this.container.add(
                    new AnimateIn(
                        this.initFormControl(question, textInput)
                    ).render()
                )

                break;
        
            default:

                break;
        }
    }

    /**
     * `ask()`'s the next question.
     * @param {Object} currentQuestion The current question object
     */
    nextQuestion(currentQuestion){

        let nextQuestion = currentQuestion.next;

        this.formTimeline.push( currentQuestion);

        if (nextQuestion){
            this.ask(this.questions[nextQuestion]);
        } else {
            this.container.clear(); 

            this.onComplete(this.questions);


            this.container.add(
                new AnimateIn(
                    new Heading('Thank you!').render()
                ).render()
            );
        }

        //console.log(currentQuestion);
        //this.ask(currentQuestion);

    }

    /**
     * Go back to the previous question.
     */
    prevQuestion(){
            
        if (this.formTimeline.length > 0){
            let prevQuestion = this.formTimeline.pop();
            this.ask(prevQuestion);
        }
    
    }


    initFormControl(question, input){

        let btnContainer = document.createElement('div');
        btnContainer.classList.add('flex','justify-between','items-center');

        let nextBtn = new NextBtn(()=>{
            question.value = input.getValue();

            if (question.value){
                this.nextQuestion(question);
            }
        });
        
        let prevBtn = new BackBtn((()=>{
            this.prevQuestion();
        }))
        
        btnContainer.appendChild(prevBtn.render());
        btnContainer.appendChild(nextBtn.render());

        return btnContainer;
    }
}