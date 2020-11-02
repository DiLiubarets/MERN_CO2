import React, { useState } from "react";
import { connect } from "react-redux";

const WeatherOutput = ({ weatherData }) => {
  const {
    temp,
    temp_min,
    temp_max,
    feels_like,
    pressure,
    humidity,
  } = weatherData.main;
  let iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const [option, setOption] = useState("fahrenheit");

  const toCelsius = (temp) => Math.round((5 / 9) * (temp - 32));
  const switchToC = () => setOption("celsius");
  const switchToF = () => setOption("fahrenheit");

  return (
    <div id="weather-data">
      <div className="row">
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>
          <p className="center-align" id="location">
            {weatherData.name}, {weatherData.sys.country}
            {option === "fahrenheit" ? `${temp} °F` : `${toCelsius(temp)} °C `}
          </p>
          <label>
            °F
            <input
              type="radio"
              value="f"
              checked={option === "fahrenheit"}
              onChange={switchToF}
            ></input>
          </label>{" "}
          <label>
            °C
            <input
              type="radio"
              value="c"
              checked={option === "celsius"}
              onChange={switchToC}
            ></input>
          </label>
        </div>
        <div className="col">
          <img className="icon-centered" src={iconUrl} alt="weather icon"></img>

          <p className="center-align">
            Conditions: {weatherData.weather[0].main} -{" "}
            {weatherData.weather[0].description}
          </p>
        </div>
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">
            Temperature:{" "}
            {option === "fahrenheit"
              ? `${Math.round(temp)} °F`
              : `${toCelsius(temp)} °C `}{" "}
          </p>
        </div>
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">
            Min temperature:{" "}
            {option === "fahrenheit"
              ? `${Math.round(temp_min)} °F`
              : `${toCelsius(temp_min)} °C `}{" "}
          </p>
        </div>
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">
            Feels like:{" "}
            {option === "fahrenheit"
              ? `${Math.round(feels_like)} °F`
              : `${toCelsius(feels_like)} °C `}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">Pressure: {pressure} hpa</p>
        </div>
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">Humidity: {humidity} %</p>
        </div>
        <div className="col">
          <span
            className="icon-centered"
            role="img"
            style={{ fontSize: "100px" }}
            aria-label="Globe Emoji (showing Americas)"
          >
            &#127758;
          </span>{" "}
          <p className="center-align">
            Min temperature:{" "}
            {option === "fahrenheit"
              ? `${Math.round(temp_min)} °F`
              : `${toCelsius(temp_min)} °C `}{" "}
          </p>
        </div>
      </div>

      {/* 
        <p>Conditions: {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
        <p>Temperature: {option === 'fahrenheit' ? `${Math.round(temp)} °F` : `${toCelsius(temp)} °C `} </p>
        <p>Min temperature: {option === 'fahrenheit' ? `${Math.round(temp_min)} °F` : `${toCelsius(temp_min)} °C `} </p>
        <p>Max temperature: {option === 'fahrenheit' ? `${Math.round(temp_max)} °F` : `${toCelsius(temp_max)} °C `}</p>
        <p>Feels like: {option === 'fahrenheit' ? `${Math.round(feels_like)} °F` : `${toCelsius(feels_like)} °C `}</p>
        <p>Pressure: {pressure} hpa</p>
        <p>Humidity: {humidity} %</p>
        <p></p> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetching: state.fetching,
    weatherData: state.weather,
  };
};

export default connect(mapStateToProps)(WeatherOutput);
