import {useEffect, useState} from 'react';
import './App.css'
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import MyNameButton from './components/MyNameButton';

function App() {

  
  

  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [weatherContent, setWeatherContent] = useState(null);
  const [userFav, setUserFav] = useState([]);
  
  //Create a weatherContent object to hold information
  const updateWeatherContent = (apiResult) => {
    let weatherObj={};
    weatherObj.city = apiResult.data.name
    weatherObj.country = apiResult.data.sys.country
    weatherObj.description = apiResult.data.weather[0].description
    weatherObj.temperature = apiResult.data.main.temp
    weatherObj.feelsLike = apiResult.data.main.feels_like
    weatherObj.icon = apiResult.data.weather[0].icon
    weatherObj.windSpeed = apiResult.data.wind.speed
    setWeatherContent(weatherObj)

  } 

  //A function to do the get request and set the state from the hard code data
  const loadCity = (city) => {
    const params = new URLSearchParams({ cityName: city });
    //console.log(params);
    fetch(`http://localhost:8080/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        
        setCity(city);
        console.log(result);
        setResult(result);
        updateWeatherContent(result);
    
      });
  }
  useEffect(() => {
    console.log("Updated result:", result);
  }, [result]);

 const handleSubmit = (city) =>{
  console.log(city);
  loadCity(city);
 }

 const loadUserFav = () => {
  // A function to fetch the list of students that will be load anytime that list change
  fetch("http://localhost:8080/api/userFav")
      .then((response) => response.json())
      .then((userFav) => {
          setUserFav(userFav);
      });
}

useEffect(() => {
  loadUserFav();
}, []);


 const onSaveUserFav = (newUserFav) => {
  console.log("Inside the post", newUserFav);
  setUserFav((userFav) => [...userFav, newUserFav]);
}



  return (
    <>
      <div>
        <h1>Hi there!</h1>
        <WeatherForm city={city} handleSubmit={handleSubmit} onSaveUserFav={onSaveUserFav}   />
        
        <MyNameButton/>
        {!weatherContent? null:<WeatherCard data={weatherContent} /> }
        
       
        </div>
    </>
  )
}

export default App
