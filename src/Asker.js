
import AnimateIn from "./components/animate-in";
import Container from "./components/container";
import Heading from "./components/heading";
import Input from "./components/form/input";
import ChoiceInput from "./components/form/choiceInput";
import NextBtn from "./components/Next-btn";
import BackBtn from "./components/Back-btn";
import Textarea from "./components/form/Textarea";
import ErrorHandler from "./components/Error-renderer";
import FileUpload from "./components/form/file-upload";
import InfoScreen from "./components/form/Info-screen";
import _ from "lodash";

export default class Asker {

    /**
     * 
     * @param {HTMLElement} target The target element to render the form to.
     * @param {Object} questions Questions object
     * @param {Function} onComplete Function to be called when the form is complete.  
     * @param {Object} options
     *  
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
                }, question.min, question.max);
                

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

                case 'paragraph':
                    
                    let paragraphInput = new Textarea(question.required, (value) => {
                        if(value){
                            question.value = value;
                            this.nextQuestion(question);
                        }
                    }, question.min, question.max);

                    this.container.add(
                        new AnimateIn(
                            paragraphInput.render()
                        ).render()
                    )

                    this.container.add(
                        new AnimateIn(
                            this.initFormControl(question, paragraphInput)
                        ).render()
                    )

                    break;

                case 'file':
                    
                    let fileInput = new FileUpload(question.fileTypes, question.required)

                    this.container.add(
                        new AnimateIn(
                            fileInput.render()
                        ).render()
                    )

                    this.container.add(
                        new AnimateIn(
                            this.initFormControl(question, fileInput)
                        ).render()
                    )

                    break;

                case 'info':

                    let infoScreen = new InfoScreen(question.content)
                    this.container.add(
                        new AnimateIn(
                            infoScreen.render()
                        ).render()
                    )

                    this.container.add(
                        new AnimateIn(
                            this.initFormControl(question, infoScreen)
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

            this.onComplete(_.filter(this.questions, (q)=>{
                return q.value != undefined
            }));


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
            nextBtn.changeText("Finish")

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