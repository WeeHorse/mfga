# MFG(a)

A collection of tools, made as thin as possible, to aid in the most common conversion and processing tasks related to form state and submission. This module does not rely on any other modules.

Install: `npm i mfga`

Use: _import the methods you need from_

```js
import {
    handleSubmit, 
    setInitialState, 
    watchFormState, 
    dirtyFields, 
    disableDirtyNavigation,
    objectifyForm
} from 'mfga'
```
---

## Handle Submit

If you want to use the MFG(a) solutions in general, this wrapper function and form setup takes care of it:

### handleSubmit (event, url, method = 'post')

#### Native
```html
<form onsubmit="submitForm" onchange="watchFormState" action="/send/to/this-url" method="post">
    <input type="text" name="zip" />
    <input type="submit" value="Send" />
</form>
```

#### Reacty
```html
<form onSubmit={submitForm} onChange={watchFormState} action="/send/to/this-url" method="post">
    <input type="text" name="zip" />
    <input type="submit" value="Send" />
</form>
```

---

## Handle Form State

### watchFormState (event)
* Keeps track of your form state.
* Toggles the disabled prop on your submit button so that you cannot send an unmodified form, if you have a button or input with the type property set to type="submit".

```html
<form onChange={watchFormState}>
    <input type="text" name="zip" />
    <input type="submit" disabled value="Send" />
</form>
```

_Note that you need to manually set disabled as default (above)_

### setInitialState (state)
_(Optional)_ Apply you loaded data with this so watchFormState can watch if the form changes from the loaded data. _If not used, the initial state will be empty values._

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

---

## Handle Modified Form

### disableDirtyNavigation
The default behaviour of watchFormState is to confirm if the user wants to leave the form (by reloading, closing or navigating away). If you wish to disable this for your form, just call `disableDirtyNavigation()`

---

## Objectify Form
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