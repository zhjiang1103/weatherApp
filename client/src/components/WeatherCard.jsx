const WeatherCard = (props) => {


    return (
        <div className="weather-card">
            <div className="result">
                <p>City: <span className="data">
                    {props.name}, {props.sys.country}
                </span>
                </p>
                <p>Description: <span className="data">
                {props.weather[0].description}
              </span>
            </p>
            <img src={`http://openweathermap.org/img/wn/${props.weather[0].icon}@4x.png`} alt={"Icon from Open Weather Api"}/>
            <p>
              Temperature: <span className="data">
                {props.main.temp} <sup>o</sup>C
              </span>
            </p>
            <p>
              Feels Like: <span className="data">
                {props.main.feels_like} <sup>o</sup>C
              </span>
            </p>

            </div>

        </div>
    )
}

export default WeatherCard;