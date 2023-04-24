// objectifyForm

export function objectifyForm(form){
    const fields = Array.from(new FormData(form))
    const o = {}
    for(let f of fields){
        if(o[f[0]]){
            if(!o[f[0]].push){
                o[f[0]] = [o[f[0]]]
            }
            o[f[0]].push(f[1])
        }else{
            o[f[0]] = f[1]
        }
    }
    return o
}


// formState

export const dirtyFields = new Set()
let initialState = {}

export function setInitialState(state){
    if(state){
        initialState = state 
    }
}

export function watchFormState (e){
    (initialState[e.target.name] != e.target.value) ? dirtyFields.add(e.target.name) : dirtyFields.delete(e.target.name)
    e.target.parentNode.querySelector('*[type="submit"]').disabled = (dirtyFields.size === 0)
}

