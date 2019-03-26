import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

class Visualization extends React.Component {
  componentDidMount() {
    this.props.onLoad();
    this.updateData();
  }

  updateData() {
    setTimeout(() => {
      this.props.onLoad();
      this.updateData();
    }, 4000);
  }

  render() {
    const {
      timestamp,
      latitude,
      longitude,
      temperatureinFahrenheit,
      name,
      weather_state_name
    } = this.props;

    return (
      <div>
        <p>latitude: {latitude}</p>
        <p>longitude: {longitude}</p>
        <p>
          It's {temperatureinFahrenheit} degrees and {weather_state_name} in{" "}
          {name}
        </p>
        <p>
          Last update: {Math.floor((Date.now() - timestamp) / 1000)} seconds ago
        </p>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit
  } = state.weather;

  const { latitude, longitude, timestamp } = state.drone;

  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude,
    timestamp
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(Visualization);
