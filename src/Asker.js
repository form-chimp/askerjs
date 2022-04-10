
import AnimateIn from "./components/animate-in";
import Container from "./components/container";


export default class Asker {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {Array | JSON | Object} questions 
     * @param {Object} options 
     */
    constructor(target,questions, options){

        /** TODO: Get the target element */

        if (target instanceof HTMLElement) {
            this.target = target;
        } else {
            throw new Error('The target is not a valid HTMLElement');
        }

        this.container = new Container(this.target);

        

    }


}