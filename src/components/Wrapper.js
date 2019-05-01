import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    background: theme.palette.background.main,
    height: "auto",
    paddingBottom: "50px"
  }
});

const Wrapper = props => {
  const { classes } = props;
  return <div className={classes.wrapper}>{props.children}</div>;
};

export default withStyles(styles)(Wrapper);
