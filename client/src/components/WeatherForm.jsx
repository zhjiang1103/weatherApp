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

    const saveUserCity = (userFav) =>{
            fetch("http://localhost:8080/api/userfav", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userFav)
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //console.log("From the post ", data);
                    //I'm sending data to the List of Students (the parent) for updating the list
                    props.onSaveUserFav(data);
                    //this line just for cleaning the form
                    //clearForm();
                });
        };
    

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