import { watchFormState, handleSubmit } from "../../../../index.js"

export default function () {

    return (
        <form id="form3" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://api.restful-api.dev/objects">
            <h2>Form 3</h2>
            <label>Email<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <label>Number<input type="number" name="number" min="1900" max="2030" step="10" defaultValue="2020" /></label>
            <label>Range<input type="range" name="range" defaultValue="100" /></label>
            <label>Color<input type="color" name="color" defaultValue="#ddeeff" /></label>
            <label>Search<input type="search" name="search" /></label>
            <label>Tel<input type="tel" name="tel" /></label>
            <label>Url<input type="url" name="url" /></label>
            <fieldset>
                <legend>Date & Time</legend>
                <label>Date<input type="date" name="date" defaultValue="2023-05-08" /></label>
                <label>Time<input type="time" name="time" defaultValue="09:20" /></label>
                <label>Date and time<input type="datetime-local" name="datetime" defaultValue="2023-05-08 09:20" /></label>
                <label>Month<input type="month" name="month" /></label>
                <label>Week<input type="week" name="week" /></label>
            </fieldset>
            <button type="button">Just a button of type button that does nothing</button>
            <input type="button" value="Just a button of type input that does nothing" />
            <label>This field should be ignored in the post data and in the dirty check<input type="text" defaultValue="Missing name attribute" /></label>

            <input type="reset" value="Reset form" />
            <input type="submit" value="Submit form" disabled />

            <p><em>Inspect the payload in the Network tab in Developer Tools</em></p>
        </form>
    )
}
