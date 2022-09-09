import AnimateIn from "./components/animate-in.js";
import Container from "./components/container.js";
import Heading from "./components/heading.js";
import Input from "./components/form/input.js";
import ChoiceInput from "./components/form/choiceInput.js";
import NextBtn from "./components/next-btn.js";
import BackBtn from "./components/back-btn.js";
import Textarea from "./components/form/Textarea.js";
import FileUpload from "./components/form/file-upload.js";
import InfoScreen from "./components/form/Info-screen.js";
import _ from "lodash";
import getAnswers from "./getAnswers.js";
import MultiChoiceInput from "./components/form/multiChoiceInput.js";
import questionTypes from "./question-types.js";

export default class Asker {

    /**
     * 
     * @param {HTMLElement} target The target element to render the form to.
     * @param {Object} questions Questions object
     * @param {Function} onComplete Function to be called when the form is complete.  
     * @param {Object} options Config options for Asker.
     */
    constructor(target,questions,onComplete){

        this.questionTypes = questionTypes
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

        if (!question || question === null){
            this.container.clear();
            
            this.container.add(
                new AnimateIn(
                    new Heading(`Error`).render()
                ).render()
            );

            throw new Error('The question is not a valid object');
        }
        this.container.clear();

       this.container.add(
            new AnimateIn(
                new Heading(question.text).render()
            ).render()
        );

        if(question.description){
            this.container.add(
                new AnimateIn(
                    `<p class="Asker_description">${question.description}</p>`
                ).render()
            )
        }

        let questionInput = _.find(questionTypes,{type:question.type})

        let constructor = new questionInput.constructor(question, (value)=>{
            if(value){
                question.value = value;
                this.nextQuestion(question);
            }
        })
        this.container.add(
            new AnimateIn(
                constructor.render()
            ).render()
        )

        this.container.add(
            new AnimateIn(
                this.initFormControl(question,constructor)
            ).render()
        )
    }

    /**
     * `ask()`'s the next question.
     * @param {Object} currentQuestion The current question object
     */
    nextQuestion(currentQuestion){

        let nextQuestion = currentQuestion.next;

        this.formTimeline.push( currentQuestion);

        if (currentQuestion.callback){
            currentQuestion.callback(currentQuestion)
        }

        if (nextQuestion){
            this.ask(this.questions[nextQuestion]);
        } else {
            this.container.clear(); 
            


            this.onComplete(getAnswers(this.questions));


            // this.newContent(
            //     new AnimateIn(
            //         new Heading('Thank you!').render()
            //     ).render()
            // );
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
        btnContainer.classList.add('asker_buttons-container');

        let nextBtn = new NextBtn(()=>{
            if(question.type === 'info'){
                this.nextQuestion(question)
                return;
            }
            question.value = input.getValue();

            if (question.value){
                this.nextQuestion(question);
            }
        });
        
        let prevBtn = new BackBtn((()=>{
            this.prevQuestion();
        }))
        
        if(this.formTimeline.length){
            btnContainer.appendChild(prevBtn.render());
        }
        
        if(!question.next){
            nextBtn.changeText("Continue")

        }

        btnContainer.appendChild(nextBtn.render());

        return btnContainer;
    }

    /**
     * Change the content of the form.
     * @param {HTMLElement | String} content
     */
    newContent(content){

        this.container.clear();

        this.container.add(
            new AnimateIn(
                content
            ).render()
        );
    }
}