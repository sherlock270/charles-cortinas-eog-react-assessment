import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const Chip = withStyles(cardStyles)(ChipRaw);

class Weather extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.callWeather();
  }

  callWeather() {
    setTimeout(() => {
      this.props.onLoad();
      this.callWeather();
    }, 4000);
  }

  render() {
    const {
      loading,
      name,
      weather_state_name,
      temperatureinFahrenheit
    } = this.props;
    //if (loading) return <LinearProgress />;
    return (
      <Chip
        label={`Weather in ${name}: ${weather_state_name} and ${temperatureinFahrenheit}°`}
      />
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
  console.log("state", state);
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit
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
)(Weather);
