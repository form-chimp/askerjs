import Asker from "../lib/build";


let target = document.getElementById('AskerJS')


let questions = {
    'q-1':{
        text: 'Isn\'t this pretty cool?',
        type: 'info',
        content:`<div class="asker_heading">Hello</div>`,
        next: 'q-2'
    },
    'q-2':{
        text: 'Would you like to see more?',
        type: 'multipleChoice',
        choices: [
            '🙄 Heck yeah',
            '👎 Nah bro' 
        ],
        required: true,
    },
    'q-3':{
        text: 'Would you like to see more?',
        type: 'singleChoice',
        choices: [
            '🙄 Heck yeah',
            '👎 Nah bro' 
        ],
        other:true,
        required: false,
    },
}



let asker = new Asker(target, questions, formComplete);

asker.ask(questions["q-3"]);

function formComplete(data){
    console.log(data);
    asker.newContent(`

        <h1 class="text-5xl">🎉🎉 Thank you!!</h1>
    
    `);
}