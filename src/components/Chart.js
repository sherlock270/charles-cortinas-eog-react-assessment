import React from "react";
import Plot from "react-plotly.js";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ type: "line", x: props.x, y: props.y }],
      layout: { width: 800, height: 600, title: "Drone Metrics" },
      frames: [],
      config: {},
      revision: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      Date.parse(this.props.x[this.props.x.length - 1]) !==
      Date.parse(nextProps.x[nextProps.x.length - 1])
    )
      this.setState(prevState => {
        return {
          revision: prevState.revision + 1,
          data: [{ type: "line", x: nextProps.x, y: nextProps.y }]
        };
      });
  }

  render() {
    return (
      <Plot
        style={{ margin: "auto" }}
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={figure => this.setState(figure)}
        onUpdate={figure =>
          this.setState({ layout: figure.layout, frames: figure.frames })
        }
        revision={this.state.revision}
      />
    );
  }
}

export default Chart;
