const WeatherCard = (props) => {


    return (
        <div className="weather-card">
            <div className="result">
                <p>City: <span className="data">
                    {props.data.city}, {props.data.country}
                </span>
                </p>
                <p>Description: <span className="data">
                {props.data.description}
              </span>
            </p>
            <img src={`http://openweathermap.org/img/wn/${props.data.icon}@4x.png`} alt={"Icon from Open Weather Api"}/>
            <p>
              Temperature: <span className="data">
                {props.data.temperature} <sup>o</sup>C
              </span>
            </p>
            <p>
              Feels Like: <span className="data">
                {props.data.feelsLike} <sup>o</sup>C
              </span>
            </p>
            <p>
              Wind Speed: <span className="data">
                {props.data.windSpeed} 
              </span>
            </p>

            </div>

        </div>
    )
}

export default WeatherCard;