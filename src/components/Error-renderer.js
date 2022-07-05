import AnimateIn from "./animate-in";




export default class ErrorHandler{
    
        constructor(target,massage){
            this.target = target;
            this.massage = massage || 'Error';
            this.element = new AnimateIn(`
            <div class="asker_error-massage">
                ${massage}
            </div>
        `)


            this.target.appendChild(
                this.element.render()
            )
            console.error('ErrorHandler: ', this.massage);

            setTimeout(() => {
                this.element.out()
                
            }, 3000);

            setTimeout(() => {
                this.element.container.remove()
            }, 3300);

        }
        
}