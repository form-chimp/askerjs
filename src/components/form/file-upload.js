import _ from "lodash"
import ErrorHandler from "../error-renderer.js"


export default class FileUpload{

    /**
     * 
     * @param {object} question Question object 
     * @param {Function} onComplete Callback for when it's complete.
     */
    constructor(question,onComplete){
        
        this.types = question.types || undefined
        this.required = question.required || false
        
        this.container = document.createElement('div')

        this.element = document.createElement('input')
        this.element.type = 'file'

        this.dropZone = document.createElement('div')
        this.dropZone.classList.add('asker_dropZone')
     
        this.dropZoneTitle = document.createElement('h2')
        this.dropZoneTitle.innerHTML = 'Drop your file here.'
        this.dropZoneTitle.classList.add('asker_dropZone-title')
        this.dropZone.appendChild(this.dropZoneTitle)

        this.dropZone.appendChild(this.element)

        this.container.appendChild(this.dropZone)


        this.element.addEventListener('change',(e)=>{


            this.dropZone.classList.add('droped')
            this.dropZoneTitle.innerHTML = `${e.target.files[0].name}`

            this.valid()
        })
    }

    /**
     * 
     * @returns {HTMLElement} Component element.
     */
    render(){
        return this.container
    }

    
   
    getValue(){
        
        if (this.valid()) {
            
            if(this.element.files[0] === undefined){
                return "null"
            }
            return this.element.files[0]
        }
    }

    valid(){

        if(this.required){

            if(this.element.files[0] != undefined){

                if(this.types){

                    let fileType = _.split(this.element.files[0].name,'.')[1]
    
    
                    if(_.includes(this.types,fileType)){
                        this.dropZone.classList.remove('error')
                        return true
                    }else{
    
                        new ErrorHandler(this.container, `Invalid file type! Please upload a file that ends with .${this.types}`)
                        this.dropZone.classList.add('error')
                        this.dropZoneTitle.innerHTML+=`⚠⚠`
    
                        
                        return false
                    }
            
                }else{
                    return true
                }
            }else{
                new ErrorHandler(this.container, `Please upload a valid file!`)
                return false
            }
            
        }else{
            return true
        }
    }
}