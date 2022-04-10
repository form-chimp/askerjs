



export default class Container{
    constructor(target){
        this.target = target;

        this.element = document.createElement('div');

        let tailwindClasses = ['w-full', 'p-4', 'bg-gray-50','asker_container'];

        this.element.classList.add(...tailwindClasses);

        this.target.appendChild(this.element);
    }

    /**
     * Adds a new element to the container
     * @param {HTMLElement | String} element `HTMLElement` or `Template strings`
     */
    add(element){
       
        if (element instanceof HTMLElement) {
            this.element.appendChild(element);
        } else {
            this.element.innerHTML += element;
        }
    }
}