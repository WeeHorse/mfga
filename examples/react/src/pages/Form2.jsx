import { watchFormState, handleSubmit } from "../../../../index.js"
import { useState } from "react"

export default function () {

    const browsers = [
        "Internet Explorer", 
        "Firefox",
        "Chrome",
        "Opera",
        "Safari"
    ]

    const vehicles = [
        {value: "Car", text: "I have a car"},
        {value: "Bike", text: "I have a bike"},
        {value: "Boat", text: "I have a boat"},
        {value: "Airplane", text: "I have an airplane"},
        {value: "Helicopter", text: "I have a helicopter"},
        {value: "Train", text: "I have a train"}
    ]

    return (
    <form id="form2" onSubmit={handleSubmit} onChange={watchFormState} method="post" action="https://api.restful-api.dev/objects">        
        <h2>Form 2</h2>

        <input type="hidden" name="r2id" value="11"/>
        <input type="hidden" name="d2id" value="22"/>

        <input name="name" value="No name"/>
        <input name="slogan" value ="No slogan"/>

        <input name="browser" list="browsers" placeholder="Pick your poison"/>
        <datalist id="browsers">
            {browsers.map(browser=><option key={browser} value={browser}/>)}
        </datalist>

        <label><input type="radio" name="language" value="Java"/>Java is better</label>
        <label><input type="radio" name="language" value="C#"/>C# is better </label>

        <fieldset>
            <legend>Vehicles</legend>
            {vehicles.map(vehicle=><label key={vehicle.value}><input type="checkbox" name="vehicle" value={vehicle.value}/>{vehicle.text}</label>)} 
        </fieldset>

        <label><input type="checkbox" name="robot" value="true"/>I am a Robot</label>

        <label><input type="checkbox" name="android" value="3CPO" checked/>I am not a Humanoid</label>

        <input type="reset" value="reset"/>
        <input type="submit" value="submit" disabled/>
      
        <p><em>Inspect the payload in the Network tab in Developer Tools</em></p>
    </form>
    )
}
