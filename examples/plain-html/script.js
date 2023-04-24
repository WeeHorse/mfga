

const url = "/some-url-to-post-or-put-to"

import { objectifyForm, watchFormState, setInitialState } from '../../index.js'

/* 
Only if you load data into the form, like for an update, 
you should pass the loaded data (state) here. 
Otherwise there's no need to call setInitalState.
*/
setInitialState({
    name: "No name",
    slogan: "No slogan"
})

// watch the form
document.querySelector('#form1').addEventListener("change", watchFormState)

// listen to submit
document.querySelector('#form1').addEventListener("submit", submitForm)

async function submitForm(e) {
    e.preventDefault()
    await fetch(url,{
        method: 'post',
        // using objectifyForm to convert formData into a JS object
        body: JSON.stringify(objectifyForm(e.target))
    })
}

