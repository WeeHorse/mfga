
// Handle Submit
export async function handleSubmit(e){
    const form = e.target
    e.preventDefault()   
    form.classList.add('mfga-processing')
    
    const result = await fetch(form.action,{
        method : form.attributes.method.value, // bypassing e.target.method since it only allows post, get and dialog: https://www.w3.org/TR/html401/interact/forms.html#h-17.13
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectifyForm(form))            
    })
    form.classList.remove('mfga-processing')
    if(result.ok){
        form.querySelector('*[type="submit"]').disabled = true
        window.removeEventListener('beforeunload', form.dirtyNavigationListener)
        return result
    }
}

// Handle Form State
export function watchFormState (e){
    const field = e.target
    const form = field.closest('form')
    if(form.dirtyFields === undefined){
        form.dirtyFields = new Set()
    }
    if(fieldState(field).changed){
        form.dirtyFields.add(field.name)
    }else{
        form.dirtyFields.delete(field.name)
    }
    console.log(fieldState(field))
    console.log(form.dirtyFields)
    form.dirty = (form.dirtyFields.size === 0) 
    form.querySelector('*[type="submit"]').disabled = form.dirty        
    preventDirtyNavigation(form)    
}


// Handle Modified Form
function preventDirtyNavigation(form){
    if(form.dirtyNavInited || form.dirtyNavDisabled) return
    form.dirtyNavInited = true
    form.dirtyNavigationListener = e => {
        if(form.dirty){
            e.preventDefault();
            e.returnValue = '';
        }
    }
    window.addEventListener('beforeunload', form.dirtyNavigationListener)
}


// Standardize field data representation (helper)
function fieldState(field){
    let changed = false
    let value = null
    switch(field.type){
        case 'radio':
            return {
                changed: field.defaultChecked !== field.checked,
                value: field.checked? field.value : null
            }
        break;
        case 'checkbox':
            const isMultipleFieldsArray = field.closest('form')[field.name].length
            // now we have to iterate over the array, every time, not like this:
            if(isMultipleFieldsArray){
                value = field.checked? field.value : null 
            }else{
                value = field.checked? (field.value === "true"? true : field.value) : (field.value === "true"? false : null)
            }
            return {
                changed: field.defaultChecked !== field.checked,
                value,
                isMultipleFieldsArray
            }
        break;
        case 'select-multiple':
            const values = []
            for(let option of field.options){
                if(option.defaultSelected !== option.selected) changed = true
                if(option.selected) values.push(option.value)
            }            
            return {
                changed,
                value: values
            }
        break;
        case 'select-one':
            for(let option of field.options){
                if(option.defaultSelected !== option.selected){
                    changed = true
                }
            }
            return {
                changed,
                value: field.value
            }
        break;
        default:
            return {
                changed: field.defaultValue !== field.value,
                value: field.value
            }
        break;
    }
}


// Convert form fields to payload object 
export function objectifyForm(form){
    const body = {}
    for(let field of form.elements){
        if(['submit', 'fieldset'].includes(field.type)) continue;
        const state = fieldState(field)
        if(state.isMultipleFieldsArray){
            if(!body[field.name]){
                body[field.name] = []
            }
            if(state.value){
                body[field.name].push(state.value)
            }
        }else{
            body[field.name] = state.value
        } 
    }
    return body
}
