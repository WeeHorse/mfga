
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
            if(field.closest('form')[field.name].length){ // multiple
                value = []
                for(let checkbox of field.closest('form')[field.name]){
                    if(checkbox.defaultChecked !== checkbox.checked) changed = true
                    if(checkbox.checked) value.push(checkbox.value)
                }
            }else{ // single
                value = field.checked? (field.value === "true"? true : field.value) : (field.value === "true"? false : null)
                changed = field.defaultChecked !== field.checked
            }
            return {
                changed,
                value
            }
        break;
        case 'select-multiple':
            value = []
            for(let option of field.options){
                if(option.defaultSelected !== option.selected) changed = true
                if(option.selected) value.push(option.value)
            }            
            return {
                changed,
                value
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
        if(!field.name || ['submit','reset','fieldset','button'].includes(field.type)) continue;
        if(field.type === 'file') body[field.name] = field.fileList || field.files
        // empty checkboxes, radio buttons and multiples (checkboxes, selects) should not be passed in the payload
        if(!(!fieldState(field).value && ['checkbox','radio'].includes(field.type) || (Array.isArray(fieldState(field).value) && fieldState(field).value.length === 0))){
            body[field.name] = fieldState(field).value
        }
    }
    return body
}

export function handleFiles(e){
    // Get a reference to the file
    const field = e.target
    field.fileList = []
    for(let file of field.files){        
        const reader = new FileReader()
        reader.onloadend = () => {
            field.fileList.push({
                dataURL: reader.result,
                name: file?.name,
                lastModified: new Date(file?.lastModified).toLocaleString('sv-SE'),
                size: file?.size
            })
        };
        reader.readAsDataURL(file);
    }
}
