// server/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/db-connection.js');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


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

 app.get('/api/userFav', async (req, res) => {
  try {
      const { rows: userFav } = await db.query('SELECT * FROM userFav');
      console.log("In the server", userFav)
      res.send(userFav);
  } catch (e) {
      console.log(e);
      return res.status(400).json({ e });
  }
});


 // Define a route for the POST request
app.post('/api/userfav', async(req, res) => {
 // const  data  = req.body; // Assuming your POST request includes JSON data
  try {
    const newUserFav = {
        name: req.body.name,
        favCity: req.body.favCity,
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
        'INSERT INTO userFav(name, favCity) VALUES($1, $2) RETURNING *',
        [newUserFav.name, newUserFav.favCity],
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);

} catch (e) {
    console.log(e);
    return res.status(400).json({ e });
}

  // Perform actions with the data (e.g., save it to a database)
  //console.log('Received POST request with data:', data);

  // Send a response
  //res.json({ message: 'Data received successfully' });
});


// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});