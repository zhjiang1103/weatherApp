import { useState } from 'react'

const WeatherForm = (props) => {

    const [city, setCity] = useState('');
    const [userFav, setUserFav] = useState({name:"", favCity:""});

    const handleClick = (e) => {
        e.preventDefault();
        props.handleSubmit(city);
    }

    const onChange = (event) => {
        const city = event.target.value;
        setCity(city)
        const favCity = city
        setUserFav((userFav) => ({...userFav,favCity }))
    }

    const onNameChange = (event) =>{
        const name = event.target.value;
        setUserFav((userFav) => ({...userFav,name }))
    }

    const saveUserCity = () =>{

    }

    const updateUserCity = () =>{

    }

    return (
        <div className="weather">
            <h1 className="App-header"> Weather Forecast App</h1>
            <form onSubmit={handleClick}>
                <input
                    id="city-name"
                    type="text"
                    placeholder="Please enter the city name"
                    name="city"
                    value={city}
                    onChange={onChange}
                    required
                />
                <input
                    id="user-name"
                    type="text"
                    placeholder="Please enter the user name"
                    name="name"
                    value={userFav.name}
                    onChange={onNameChange}
                    required
                />
                <input type="submit" value="Submit" />
                <button type="button" onClick={saveUserCity}>Save Favourite City</button>
                <button type="button" onClick={updateUserCity}>Update Favourite City</button>
            </form>
        </div>
    )
}

export default WeatherForm;