# MFG(a)

A collection of tools, made as thin as possible, to aid in the most common conversion and processing tasks related to form state and submission. This module does not rely on any other modules.

Install: `npm i mfga`

Use: _import the methods you need from_

```js
import {
    handleSubmit, 
    watchFormState, 
    handleFiles,
    objectifyForm
} from 'mfga'
```
*Normally you only need __handleSubmit__ and __watchFormState__ and possibly __handleFiles__*

---

## Handle Submit

If you want to use the MFG(a) solutions in general, this wrapper function and form setup takes care of it. 

### handleSubmit (event)

#### Native
```html
<form onsubmit="handleSubmit(event)" onchange="watchFormState(event)" action="/send/to/this-url" method="post">
    <input type="text" name="zip" />
    <input type="submit" value="Send" />
</form>
```

#### Reacty
```html
<form onSubmit={handleSubmit} onChange={watchFormState} action="/send/to/this-url" method="post">
    <input type="text" name="zip" />
    <input type="submit" value="Send" />
</form>
```

Between the time of submit and response the form will have the class 'mfga-processing', which you can refer to for a css waiting animation. 

#### Example CSS

```css
.mfga-processing::before {
    content:'';
    position: fixed;
    top: 0;
    left: 0;
    width: 15%;
    height: 2px;
    display: block;
    background: white;
    box-shadow: 0 0 6px 2px rgba(100, 100, 100, 0.8);
    animation: line 1.4s linear infinite;
}

@keyframes line {
    0% {
        transform: translateX(-100%) scale(1);
    }
    40% {
        transform: translateX(280%) scale(5, 1.3);
    }
    100% {
        transform: translateX(660%) scale(1);
    }
}
```

---

## Handle Form State

### watchFormState (event)
* Keeps track of your form state.
* Toggles the disabled prop on your submit button so that you cannot send an unmodified form, if you have a button or input with the type property set to type="submit".

#### Reacty
```html
<form onChange={watchFormState}>
    <input type="text" name="zip" />
    <input type="submit" disabled value="Send" />
</form>
```

_Note that you need to manually set disabled as default (above)_

### What about initial state? 
Just apply it directly to the fields in your form:

#### Reacty
```html
<form onChange={watchFormState} onSubmit="handleSubmit">
    <input type="text" name="zip" value={zip}/>
    <input type="submit" disabled value="Send" />
</form>
```
---

## Upload files
Just set the form as __multipart__ and use the __handleFiles__ method and the JSON object posted will have a files array:

```html
<form enctype="multipart/form-data" onsubmit="handleSubmit(event)" onchange="watchFormState(event)" action="/send/to/this-url" method="post">
    <input name="slogan" value="No slogan">
    <input type="file" onchange="handleFiles(event)" name="files" multiple> 
    <input type="submit" value="Upload" disabled>
</form>
```

---

## Objectify Form
A helper function, that you may use if you wish to, well, just use this or parts of MFG(a) and not the whole thing..
Converts a form to an object, suitable for sending JSON in a POST body. Normally you wouldn't call it directly using MFG(a) but if you want to write your own submit handler you can use it to convert the form data.

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