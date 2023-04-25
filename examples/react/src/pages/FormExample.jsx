import { watchFormState, setInitialState, handleSubmit } from "../../../../index.js"
import { useLoaderData } from 'react-router-dom'

export default function () {

    const data = useLoaderData()
    setInitialState(data)

    return <form id="form1" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://1589dbb9-350b-40d2-9f8f-dd9df788b78f.mock.pstmn.io/save">

        <label htmlFor="email">Email</label>
        <input type="email" name="email" defaultValue={data?.email}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" defaultValue={data?.password}/>

        <label htmlFor="street_address">Address</label>
        <input type="text" name="street_address" defaultValue={data?.street_address} placeholder="1234 Main St" />       

        <label htmlFor="states">States</label>
        <select name="states" multiple>
            {data?.states.map(state=> <option key={state.value} value={state.value}>{state.text}</option>)}
        </select>

        <label htmlFor="city">City</label>
        <input type="text" name="city" defaultValue={data?.city} />

        <label htmlFor="zip">Zip</label>
        <input type="text" name="zip" defaultValue={data?.zip} />
        
        <input type="submit" disabled value="Send"/>
    </form>
}
