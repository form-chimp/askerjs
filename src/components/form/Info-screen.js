

export default class InfoScreen{
    constructor(content){


        this.container = document.createElement('div')
        this.container.classList.add('asker_infoScreen-container')

        if(content === HTMLElement){
            //console.log(true);
        }else{
            this.container.innerHTML = content
            //console.log(false);
        }
    }

    render(){
        return this.container
    }
}