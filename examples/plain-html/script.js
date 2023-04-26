import { handleSubmit, watchFormState, setInitialState } from 'mfga'

window.submitForm = handleSubmit // expose handleSubmit to html scope
window.watchFormState = watchFormState // expose watchFormState to html scope

/* 
Pass data (state) here, like for an update (put). 
Typically this would be a data object from fetch or similar.
If there is no previous data, like for a create (post), 
there is no need to call setInitialState 
*/

setInitialState({
    name: "No name",
    slogan: "No slogan"
})




