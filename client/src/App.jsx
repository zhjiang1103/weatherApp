import {useEffect, useState} from 'react';
import './App.css'
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import MyNameButton from './components/MyNameButton';

function App() {

  // const [myname, setMyname]=useState('')

  // const callBackEnd = async() =>{
  //   const response = await fetch('/api/myname')
  //   const data = await response.json();
  //   console.log(data);
  //   setMyname(data.name)
  // };

  // useEffect(()=>{
  //   callBackEnd()
  // },[]);
  

  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [weatherContent, setWeatherContent] = useState(null);
  
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
        //console.log(result.data.weather)
        //const weatherData=data.data.weather[0];
        setCity(city);
        console.log(result);
        setResult(result);
        updateWeatherContent(result);
        //console.log(result);
      });
  }
  useEffect(() => {
    console.log("Updated result:", result);
  }, [result]);

 const handleSubmit = (city) =>{
  console.log(city);
  loadCity(city);
 }

//  const handleButtonClick = ()=>{
//   callBackEnd();
//  }

  return (
    <>
      <div>
        <h1>Hi there!</h1>
        <WeatherForm city={city} handleSubmit={handleSubmit}/>
        {/*{!result? null:<p>{result.data.weather[0].description}</p> }*/}
        <MyNameButton/>
        {!weatherContent? null:<WeatherCard data={weatherContent} /> }
        
       
        </div>
    </>
  )
}

export default App
