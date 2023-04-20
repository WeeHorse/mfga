# MFG(a)


## objectifyForm
Converts a form to an object, suitable for sending JSON in a POST body

```js
import {objectifyForm} from './objectifyForm.js'

async function submitForm(e) {
    e.preventDefault()
    await fetch(url,{
        method: 'post',
        body: JSON.stringify(objectifyForm(e.target))
    })
}
```