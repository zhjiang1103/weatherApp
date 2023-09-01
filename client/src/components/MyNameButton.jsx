import { useState, useEffect } from "react";

const MyNameButton = () => {
  const [myname, setMyname]=useState('')

  const callBackEnd = async() =>{
    const response = await fetch('/api/myname')
    const data = await response.json();
    console.log(data);
    setMyname(data.name)
  };

  
  const handleButtonClick = (e) => {
    e.preventDefault();
    callBackEnd();
    console.log("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch Name</button>
      <p>{myname}</p>
    </div>
  );
};

export default  MyNameButton;
