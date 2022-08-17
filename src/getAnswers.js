import _ from "lodash"


export default (AskerJS_Questions)=>{
    let formatted = {}

    _.forIn(AskerJS_Questions, (qBody,qName)=>{
        if(qBody.value){
            formatted[qName] = qBody.value
        }
    })

    return formatted
}