import {useEffect, useState} from 'react';
import './App.css'

function App() {

  const [myname, setMyname]=useState('')

  const callBackEnd = async() =>{
    const response = await fetch('/api/myname')
    const data = await response.json();
    console.log(data);
    setMyname(data.name)
  };

  useEffect(()=>{
    callBackEnd()
  },[]);

  return (
    <>
      <div>
        <h1>Hi there!</h1>
        <p>{myname}</p>
        </div>
    </>
  )
}

export default App
