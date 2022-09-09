

export default class InfoScreen{
    constructor(question){

        this.content = question.content || "No Content"

        this.container = document.createElement('div')
        this.container.classList.add('asker_infoScreen-container')

        if(this.content === HTMLElement){
            //console.log(true);
        }else{
            this.container.innerHTML = this.content
            //console.log(false);
        }
    }

    render(){
        return this.container
    }
}