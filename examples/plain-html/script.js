import FormHandler from "../../index.js";

// #form1
const formHandler1 = new FormHandler();


/* 
Pass data (state) here, like for an update (put). 
Typically this would be a data object from fetch or similar.
If there is no previous data, like for a create (post), 
there is no need to call setInitialState 
*/

formHandler1.setInitialState({
    name: "No name",
    slogan: "No slogan"
})

window.submitForm1 = e => formHandler1.handleSubmit(e) // expose handleSubmit to html scope
window.watchFormState1 = e => formHandler1.watchFormState(e) // expose watchFormState to html scope



// #form2
const formHandler2 = new FormHandler();

formHandler2.setInitialState({
    name: "My name",
    slogan: "My slogan"
})


window.submitForm2 = e => formHandler2.handleSubmit(e)
window.watchFormState2 = e => formHandler2.watchFormState(e)




