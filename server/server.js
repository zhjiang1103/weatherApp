// server/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

//Set the port that you want the server to run on
const PORT = process.env.PORT || 8080;

//Fetch request to the weather API
app.get("/weather",(req,res)=>{
  const city=req.query.cityName;
  console.log("city", city);
  const apiKey= process.env.API_KEY;
  const params= new URLSearchParams({
    q: req.query.cityName,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  const url=`https://api.openweathermap.org/data/2.5/weather?${params}`
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({data});
    })
    .catch((err)=>{
      console.log(err);
    });
})

//creates an endpoint for the route /api
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from ExpressJS' });
});
//creates an endpoint for the route /api/myname 
app.get('/api/myname', (req, res) => {
   const name={name: "Janet Jiang"};
   res.json(name);
 });

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});