// Handle Submit
export async function handleSubmit(e){
    e.preventDefault()   
    e.target.classList.add('mfga-processing')
    const result = await fetch(e.target.action,{
        method : e.target.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectifyForm(e.target))            
    })
    e.target.classList.remove('mfga-processing')
    if(result.ok){
        e.target.querySelector('*[type="submit"]').disabled = true
        window.removeEventListener('beforeunload', dirtyNavigationListener)
        return result
    }
}

// Handle Form State
export const dirtyFields = new Set()
let initialState = {}

export function setInitialState(state){
    if(state){
        initialState = state 
    }
}

export function watchFormState (e){
    (initialState[e.target.name] != e.target.value) ? dirtyFields.add(e.target.name) : dirtyFields.delete(e.target.name)
    e.target.closest('form').querySelector('*[type="submit"]').disabled = (dirtyFields.size === 0)        
    preventDirtyNavigation()
}


// Handle Modified Form
const dirtyNavDisabled = false
let dirtyNavInited = false

export function disableDirtyNavigation(){
    dirtyNavDisabled = false
}

function preventDirtyNavigation(){
    if(dirtyNavInited || dirtyNavDisabled) return
    dirtyNavInited = true
    window.addEventListener('beforeunload', dirtyNavigationListener)
}

function dirtyNavigationListener(event){
    if(dirtyFields.size !== 0){
        event.preventDefault();
        event.returnValue = '';
    }
}

// Objectify Form
export function objectifyForm(form){
    const obj = {}
    for(let elem of form.elements){
        switch(elem.type){
            case 'radio':
                if(!obj[elem.name]){
                    obj[elem.name] = elem.checked? elem.value : null
                }                
            break;
            case 'checkbox':
                if(form[elem.name].length){
                    if(!obj[elem.name]?.push){
                        obj[elem.name] = []
                    }
                    if(elem.checked){
                        obj[elem.name].push(elem.value)
                    }
                }else{
                    if(elem.checked){
                        obj[elem.name] = elem.value
                    } 
                }
            break;
            case 'select-multiple':
                if(!obj[elem.name]?.push){
                    obj[elem.name] = []
                }
                for(let option of elem.options){
                    if(option.selected){
                        obj[elem.name].push(option.value)
                    }
                }
            break;
            case 'submit':
                // don't capture it
            break;
            case 'fieldset':
                // don't capture it
            break;
            default:
                obj[elem.name] = elem.value? elem.value : null
            break;
        }        
    }

    return obj
}