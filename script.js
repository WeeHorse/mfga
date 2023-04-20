document.querySelector('form').addEventListener("submit", submitForm)

const url = "https://1589dbb9-350b-40d2-9f8f-dd9df788b78f.mock.pstmn.io/login"

import {objectifyForm} from './objectifyForm.js'

async function submitForm(e) {
    e.preventDefault()
    await fetch(url,{
        method: 'post',
        body: JSON.stringify(objectifyForm(e.target))
    })
}

