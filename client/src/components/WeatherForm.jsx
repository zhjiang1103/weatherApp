import { useState } from 'react'

const WeatherForm = (props) => {

    const [city, setCity] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        props.handleSubmit(city);
    }

    const onChange = (event) => {
        const city = event.target.value;
        setCity(city)
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default WeatherForm;