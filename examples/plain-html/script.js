import { watchFormState, handleSubmit } from '../../index.js'

const form1 = document.querySelector('#form1') // select the form to handle with MFG(a)

// if you are using the form state watcher, you will probably want to disable the submit button until there is a change in data:
form1.querySelector('*[type="submit"]').disabled = true // (alternatively, you can do this in your html, the form2 example does that)

form1.onsubmit = handleSubmit // connects MFG(a) submit handler to form submit event
form1.onchange = watchFormState // connects MFG(a) form state handler to form change event


// Another form?

const form2 = document.querySelector('#form2') // select another form to handle with MFG(a), if you have more than one

/* 
Apply (optional) data (state) here, like for an update (put). 
Typically this would be a data object from fetch or similar.
If there is no previous data, like for a create (post), 
there is no need to call setInitialState 
*/
// form2.initialState = {
//   name: "No name",
//   slogan: "No slogan"
// }

form2.onsubmit = handleSubmit // set MFG(a) submit handler to form submit event
form2.onchange = watchFormState // set MFG(a) form state handler to form change event

// just like you set the event handlers in the code, above, you can add method and action the same way too, if you prefer:
form2.method = "put" 
form2.action = "https://1589dbb9-350b-40d2-9f8f-dd9df788b78f.mock.pstmn.io/update"

