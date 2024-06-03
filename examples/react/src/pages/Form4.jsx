import { watchFormState, handleSubmit } from "../../../../index.js"

export default function () {

    return (
    <form enctype="multipart/form-data" id="form4" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://api.restful-api.dev/objects">
        <h2>Form 4</h2>
        <input name="name" value="No name"/>
        <input name="slogan" value ="No slogan"/>
        <label><input type="file" name="files" multiple/>Select files</label>  
        <input type="reset" value="reset"/>
        <input type="submit" value="submit" disabled/>
      
        <p><em>Inspect the payload in the Network tab in Developer Tools</em></p>
    </form>
    )
}
