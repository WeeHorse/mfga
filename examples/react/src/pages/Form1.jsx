import { watchFormState, handleSubmit } from "../../../../index.js"

export default function () {

    return (
    <form id="form1" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://api.restful-api.dev/objects">        
        <h2>Basic form fields</h2>        
        
        <label htmlFor="name">Name</label>
        <input name="name"/>
        
        <label htmlFor="slogan">Slogan</label>
        <input name="slogan"/>

        <label htmlFor="foo-or-bar">Foo or bar</label>
        <select name="foo-or-bar">
            <option>No option</option>
            <option value="foo" selected>Foo</option>
            <option value="bar">Bar</option>
        </select>

        <label htmlFor="pigs-in-a-blanket">Pigs in a blanket</label>
        <select name="pigs-in-a-blanket" multiple>
            <option>No option</option>
            <option value="pigs">Pigs</option>
            <option value="in">In</option>
            <option value="a">A</option>
            <option value="blanket">Blanket</option>
        </select>

        <label htmlFor="no-selected-option">No selected option</label>
        <select name="no-selected-option">
            <option>First option is default</option>
            <option value="one">One</option>
            <option value="two">Two</option>
        </select>

        <label htmlFor="multiple-pre-selected-options">Multiple pre-selected options</label>
        <select name="multiple-pre-selected-options" multiple>
            <option value="pigs" selected>Pigs</option>
            <option value="in" selected>In</option>
            <option value="a">A</option>
            <option value="blanket">Blanket</option>
        </select>

        <p>There form has a hidden field with the name <em>"id"</em> and the value <em>"11"</em></p>
        <input type="hidden" name="id" value="11"/>

        <label><input type="checkbox" name="robot" value="true" checked/>I am a Robot</label>

        <input type="submit" value="submit" disabled/>
        
        <p><em>Inspect the payload in the Network tab in Developer Tools</em></p>
    </form>
    )
}
