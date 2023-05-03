import { handleSubmit, watchFormState } from '../../index.js'

const form1 = document.querySelector('#form1')
// form1.initialState = {
//     name: "No name",
//     slogan: "No slogan"
// }
form1.onsubmit = handleSubmit // expose handleSubmit to html scope
form1.onchange = watchFormState // expose watchFormState to html scope

/* 
Pass data (state) here, like for an update (put). 
Typically this would be a data object from fetch or similar.
If there is no previous data, like for a create (post), 
there is no need to call setInitialState 
*/

// setInitialState({
//     name: "No name",
//     slogan: "No slogan"
// })




