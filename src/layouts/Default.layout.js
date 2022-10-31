import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter } from "react-router-dom";

import MainRouter from "../routers/Main.router";
import SideBar from "../components/Navigation/SideBar";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar/";
import Typography from "@material-ui/core/Typography/";

import Grid from "@material-ui/core/Grid";
import { setActiveWorkSpace } from "../utils/StorageUtils";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 2,
  },
  container: {
    padding: "35px",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appbarHeader: {
    zIndex: 1012,
  },
  sideList: {
    backgroundColor: "#424242",
    zIndex: 1010,
    height: "100vh",
  },
};

class Layout extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    checked: false,
    redirectTo: "/halo",
    isRedirect: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleChange = () => {
    this.setState((state) => ({ checked: !state.checked }));
  };

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const { classes } = this.props;
    const { redirectTo, isRedirect } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item md={12}>
          <AppBar className={classes.appbarHeader} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                GUIPIG GENERATOR
                {isRedirect ? <Redirect to={redirectTo} /> : null}
              </Typography>
              <Typography
                variant="h10"
                color="inherit"
                className={classes.grow}
              >
                &nbsp;v0.1
              </Typography>
              <Button
                color="inherit"
                style={{ float: "right" }}
                onClick={() => {
                  setActiveWorkSpace(null);
                  this.props.onRefreshWorkSpace();
                }}
              >
                Switch
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid className={classes.sideList} color="primary" item md={2}>
          <SideBar handleListItemClick={this.handleListItemClick} />
        </Grid>
        <Grid item md container className={classes.container}>
          <MainRouter />
        </Grid>
      </Grid>
    );
  }

  handleListItemClick = (url) => {
    this.setState({ redirectTo: url, isRedirect: true });
  };
}

export default withRouter(withStyles(styles)(Layout));
