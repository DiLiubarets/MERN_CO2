import React from "react";
import { connect } from "react-redux";
import {
  setCurrentLocation,
  getWeatherData,
  setFetchingTrue,
  clearLocation,
} from "../../redux/actions";

const LocationButton = ({ setLocation, getWeatherData, setFetching }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setFetching();
    getCurrentLocationData();
  };

  const getCurrentLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        // setLocation and getWeatherData go to Redux
        setLocation({ position: { latitude, longitude } });
        getWeatherData(latitude, longitude, "coordinates");
      });
    }
  };

  return (
    <div>
      <button onClick={handleClick} className="green-btn btn-small">
        Current Location
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFetching: () => dispatch(setFetchingTrue()),
    setLocation: (location) => dispatch(setCurrentLocation(location)),
    getWeatherData: (latitude, longitude, type) =>
      dispatch(getWeatherData(latitude, longitude, type)),
    clearLocation: () => dispatch(clearLocation()),
  };
};

export default connect(null, mapDispatchToProps)(LocationButton);
