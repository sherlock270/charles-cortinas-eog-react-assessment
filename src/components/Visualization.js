import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Map from "./Map";
import Chart from "./Chart";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  wrapper: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  locInfo: {
    width: "80%",
    backgroundColor: "white",
    border: "1px solid black",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "5px",
    paddingLeft: "5%"
  },
  label: {
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid black",
    borderRadius: "10px",
    padding: "2px",
    width: "15%",
    margin: "5px"
  },
  info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

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
      droneData,
      classes
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
        let time = new Date(point.timestamp);
        timestamps.push(time);
      }
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.locInfo}>
          <div className={classes.info}>
            <Typography className={classes.label}>Latitude: </Typography>
            <Typography>{latitude}</Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.label}>Longitude: </Typography>
            <Typography>{longitude}</Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.label}>Last Update: </Typography>
            <Typography>
              {updatedAt.toDateString()} {updatedAt.toTimeString()}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.label}>Temperature: </Typography>
            <Typography>{Math.round(temperatureinFahrenheit)}˚F</Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.label}>
              Weather Condition:{" "}
            </Typography>
            <Typography>{weather_state_name}</Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.label}>Nearest City: </Typography>
            <Typography>{name}</Typography>
          </div>
        </div>
        <Map
          isMarkerShown
          googleMapURL={mapUrl}
          loadingElement={<div style={{ height: `100%`, width: "75%" }} />}
          containerElement={
            <div
              style={{
                height: `450px`,
                width: "900px",
                margin: "20px auto"
              }}
            />
          }
          mapElement={
            <div style={{ height: `100%`, width: "100%", margin: "auto" }} />
          }
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
)(withStyles(styles)(Visualization));
