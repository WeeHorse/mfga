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