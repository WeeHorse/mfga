# MFG(a)

## Convert FormData to JS object

install: `npm i mfga`

use:

```js
import {objectifyForm, watchFormState, dirtyFields} from 'mfga'
```

### objectifyForm
Converts a form to an object, suitable for sending JSON in a POST body

```js
async function submitForm(e) {
    e.preventDefault()
    await fetch(url,{
        method: 'post',
        body: JSON.stringify(objectifyForm(e.target))
    })
}
```

```html
<form onSubmit={submitForm}>
    <input type="text" name="zip" />
    <input type="submit" value="Send" />
</form>
```

## Handle Form State

### watchFormState
* Keeps track of your form state.
* Toggles the disabled prop on your submit button so that you cannot send an unmodified form, if you have a button or input with the type property set to type="submit".

```html
<form onChange={watchFormState}>
    <input type="text" name="zip" />
    <input type="submit" disabled value="Send" />
</form>
```

_Note that you need to manually set disabled as default (above)_

### setInitialState
Set you loaded data with this so watchFormState can watch if the form changes from the loaded data. 

```js
setInitialState({
    zip: "12345"
})
```

_Note: This does not preload the data into the form, you have to do that by some other means, this only references the loaded data for watchFormState to match changes to._

### dirtyFields
You don't have to explicitly call dirtyFields if all you want is for the submit button to toggle and thus prevent sending an unmodified form. 

__dirtyFields__ is a Set containing the fields that are currently modified:


```js
dirtyFields.size // tells you how many fields are modified.
dirtyFields.has('zip') // tells you if "zip" is modified
```

## Examples
Examples can be found in the examples branch, here: 
https://github.com/WeeHorse/mfga/tree/examples/examples
