import {useEffect, useState} from 'react';
import './App.css'
import WeatherForm from './components/WeatherForm';

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

  //A function to do the get request and set the state from the hard code data
  const loadCity = (city) => {
    const params = new URLSearchParams({ cityName: city });
    //console.log(params);
    fetch(`http://localhost:8080/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.data.weather)
        const weather=result.data.weather[0];
        setCity(city);
        console.log(weather);
        setResult(weather);
        //console.log(result);
      });
  }

 const handleSubmit = (city) =>{
  console.log(city);
  loadCity(city);
 }


  return (
    <>
      <div>
        <h1>Hi there!</h1>
        <WeatherForm city={city} handleSubmit={handleSubmit}/>
        {!result? null:<p>{result.description}</p> }
       {/* <p>{result.main}</p>
        {result.map((item,index)=>{
          <p>item.description</p>
        })}
       {/*<p>{myname}</p> */}
        </div>
    </>
  )
}

export default App
