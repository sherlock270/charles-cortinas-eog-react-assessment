import React from "react";
import Plot from "react-plotly.js";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y
    };
  }
  render() {
    return (
      <Plot
        style={{ margin: "auto" }}
        data={[{ type: "bar", x: this.state.x, y: this.state.y }]}
        layout={{ width: 320, height: 240, title: "Drone Metrics" }}
      />
    );
  }
}

export default Chart;
