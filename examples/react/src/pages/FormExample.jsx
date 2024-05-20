import { watchFormState, handleSubmit } from "mfga"
import { useLoaderData } from 'react-router-dom'

export default function () {

    const data = useLoaderData()

    return (
        <form id="form1" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://1589dbb9-350b-40d2-9f8f-dd9df788b78f.mock.pstmn.io/save">

        <input type="hidden" name="hidden_id" value={11}/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" defaultValue={data?.email}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" defaultValue={data?.password}/>

        <label htmlFor="street_address">Address</label>
        <input type="text" name="street_address" defaultValue={data?.street_address} placeholder="1234 Main St" />       

        <label htmlFor="state">State</label>
        <select name="state">
            {data?.states.map(state=> <option key={state.value} value={state.value}>{state.text}</option>)}
        </select>

        <label htmlFor="city">City</label>
        <input type="text" name="city" defaultValue={data?.city} />

        <label htmlFor="zip">Zip</label>
        <input type="text" name="zip" defaultValue={data?.zip} />

        <label htmlFor="browser">Browser</label>
        <input name="browser" list="browsers" placeholder="Pick your poison" />
        <datalist id="browsers">
            {data?.browsers.map(browser=> <option key={browser.value} value={browser.value} />)}
        </datalist>

        <label htmlFor="cars">Cars</label>
        <select name="cars" multiple>
            {data?.cars.map(car=> <option key={car.value} value={car.value}>{car.text}</option>)}
        </select>

        {data?.languages.map(language=> <label key={language.value}><input type="radio" name="language" defaultValue={language.value} defaultChecked={language.checked}/>{language.text}</label>)}

        <fieldset>
            <legend>Pets</legend>
            {data?.pets.map(pet=> <label key={pet.value}><input type="checkbox" name="pets" defaultValue={pet.value} defaultChecked={pet.checked}/>{pet.text}</label>)}
        </fieldset>

        <label><input type="checkbox" name="robot" defaultValue={data?.robot} defaultChecked={data?.robot}/>I am a Robot</label>

        
        <input type="submit" disabled value="Send"/>
    </form>
    )
}
