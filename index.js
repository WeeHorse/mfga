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
// export const dirtyFields = new Set()

// let initialState = {}

// export function setInitialState(state){
//     if(state){
//         initialState = state 
//     }
// }

export function watchFormState (e){
    const form = e.target.closest('form')
    if(form.initialState === undefined){
        form.initialState = {}
    }
    if(form.dirtyFields === undefined){
        form.dirtyFields = new Set()
    }
    (form.initialState[e.target.name] != e.target.value) ? form.dirtyFields.add(e.target.name) : form.dirtyFields.delete(e.target.name)
    console.log(form.dirtyFields)
    form.querySelector('*[type="submit"]').disabled = (form.dirtyFields.size === 0)        
    preventDirtyNavigation(form)    
}


// Handle Modified Form
const dirtyNavDisabled = false
let dirtyNavInited = false

// export function disableDirtyNavigation(){
//     dirtyNavDisabled = false
// }

function preventDirtyNavigation(form){
    if(form.dirtyNavInited || form.dirtyNavDisabled) return
    form.dirtyNavInited = true
    form.dirtyNavigationListener = e => {
        if(dirtyFields.size !== 0){
            e.preventDefault();
            e.returnValue = '';
        }
    }
    window.addEventListener('beforeunload', form.dirtyNavigationListener)
}

// function dirtyNavigationListener(event){
//     if(dirtyFields.size !== 0){
//         event.preventDefault();
//         event.returnValue = '';
//     }
// }

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