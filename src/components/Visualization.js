import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Map from "./Map";
import Chart from "./Chart";

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
      weather_state_name,
      droneData
    } = this.props;

    let updatedAt = new Date(timestamp);
    const mapUrl =
      "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.API_KEY +
      "&v=3.exp&libraries=geometry,drawing,places";

    let metrics = [];
    let timestamps = [];
    if (droneData) {
      for (let point of droneData) {
        metrics.push(point.metric);
        timestamps.push(point.timestamp);
      }
    }

    return (
      <div>
        <p>latitude: {latitude}</p>
        <p>longitude: {longitude}</p>
        <p>
          It's {Math.round(temperatureinFahrenheit)} degrees and{" "}
          {weather_state_name} in {name}
        </p>
        <p>
          Last update: {updatedAt.toDateString()} {updatedAt.toTimeString()}
        </p>
        <Map
          isMarkerShown
          googleMapURL={mapUrl}
          loadingElement={<div style={{ height: `100%`, width: "75%" }} />}
          containerElement={
            <div style={{ height: `400px`, width: "75%", margin: "auto" }} />
          }
          mapElement={<div style={{ height: `100%`, width: "75%" }} />}
          lat={latitude}
          lon={longitude}
        />
        {metrics.length > 0 ? <Chart x={timestamps} y={metrics} /> : null}
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

  const { latitude, longitude, timestamp, metric, droneData } = state.drone;

  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude,
    timestamp,
    metric,
    droneData
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
