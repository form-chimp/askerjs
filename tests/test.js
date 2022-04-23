import Asker from "../lib/build";


let target = document.getElementById('AskerJS')


let questions = {
    'q-1':{
        text: 'Isn\'t this pretty cool?',
        type: 'singleChoice',
        required: false,
        choices: [
            '👏 Yes',
            '👎 No'
        ],
        next: 'q-2'
    },
    'q-2':{
        text: 'Would you like to see more?',
        type: 'singleChoice',
        choices: [
            '🙄 Heck yeah',
            '👎 Nah bro' 
        ],
        required: false,
    },
    'q-3':{
        text: 'Tell us something about yourself',
        type: 'paragraph',
        required: true,
    }
}



let asker = new Asker(target, questions, formComplete);

asker.ask(questions["q-1"]);

function formComplete(data){
    
    asker.newContent(`

        <h1 class="text-5xl">🎉🎉 Thank you!!</h1>
    
    `);
}