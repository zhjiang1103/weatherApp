import { useEffect, useState } from 'react'

const WeatherForm = (props) => {

    const [city, setCity] = useState('');
    const [userFav, setUserFav] = useState({ name: "", favCity: "" });

    const handleClick = (e) => {
        e.preventDefault();
        props.handleSubmit(city);
    }

    const onChange = (event) => {
        const city = event.target.value;
        setCity(city)
        const favCity = city
        // console.log("favcity", favCity)
        setUserFav((userFav) => ({ ...userFav, favCity }))
        console.log("userFav", userFav)
    }

    const onNameChange = (event) => {
        const name = event.target.value;
        setUserFav((userFav) => ({ ...userFav, name }))
        console.log("onchange name", userFav)
    }

    useEffect(() => {
        console.log("Updated userFav:", userFav);
    }, [userFav]);


    const saveUserCity = (newUserFav) => {
        console.log("newUserFav", newUserFav)
        fetch("http://localhost:8080/api/userfav", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserFav)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Check if props is defined and has the onSaveUserFav function
                if (props && props.onSaveUserFav) {
                    props.onSaveUserFav(data);
                } else {
                    console.error("onSaveUserFav is not a function in props.");
                }
            })
            .catch((error) => {
                console.error("Error in saveUserCity:", error);
            });
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        // props.onSaveUserFav(data);
        //this line just for cleaning the form
        //clearForm();

    };



    const updateUserCity = (toEditUserFav) => {
        //A function to handle the put request
        if (toEditUserFav.id) {
            fetch(`http://localhost:8080/api/userFav/${toEditUserFav.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toEditUserFav)
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    props.onUpdateUserFav(data);
                    //this line just for cleaning the form
                    //clearForm();
                });

        }
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
                <button type="button" onClick={() => saveUserCity(userFav)}>Save Favourite City</button>
                <button type="button" onClick={() => updateUserCity(userFav)}>Update Favourite City</button>
            </form>
        </div>
    )
}

export default WeatherForm;