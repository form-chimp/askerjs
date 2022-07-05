import AnimateIn from "./animate-in";




export default class ErrorHandler{
    
        constructor(target,massage){
            this.target = target;
            this.massage = massage || 'Error';
            this.element = new AnimateIn(`
            <p class="text-red-500"> ${this.massage} </p>
        `).render()

            this.target.appendChild(
                this.element
            )
            console.error('ErrorHandler: ', this.massage);

            setTimeout(() => {
                this.element.remove()
            }, 3000);
        }
        
}