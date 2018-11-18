import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/';
import Typography from '@material-ui/core/Typography/';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import {setActiveWorkSpace} from "../utils/StorageUtils";

import {menuList} from "../config/menus";

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 2,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appbarHeader:{
        zIndex:1012,
    },
    sideList:{
        backgroundColor: '#424242',
        zIndex:1010,
        height:"100vh"
    }
};

class Layout extends Component {

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
        checked:false,
        redirectTo:"/halo",
        isRedirect:false
    };

    constructor(props){
        super(props)
        this.state = {
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleChange = () => {
        this.setState(state => ({ checked: !state.checked }));
    };


    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }


    getRoute = () => {
        return (
            <Switch>
                {menuList.map((prop) => {
                    return <Route path={prop.url} component={prop.component} />;
                })}
            </Switch>);
    };


    render() {
        const { classes } = this.props;
        const { redirectTo,isRedirect } = this.state;
        return (<Grid container className={classes.root}>
                <Grid item md={12}>
                    <AppBar className={classes.appbarHeader} position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                GUIPIG GENERATOR
                                {isRedirect?<Redirect to={redirectTo}/>:null}
                            </Typography>
                            <Typography variant="h10" color="inherit" className={classes.grow}>
                                &nbsp;v0.1
                            </Typography>
                            <Button color="inherit" style={{float:"right"}} onClick={()=>{
                                setActiveWorkSpace(null);
                                this.props.onRefreshWorkSpace()
                            }}>Switch</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid className={classes.sideList} color="primary" item md={2}>
                    <List component="nav">
                        {menuList.map((m)=><ListItem
                            button
                            selected={this.state.selectedIndex === 0}
                            onClick={event => this.handleListItemClick(m.url)}
                        >
                            <ListItemIcon style={{color:"white"}}>
                                {m.icon}
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{style:{color:"white"}}} primary={m.title} />
                        </ListItem>)}
                    </List>
                </Grid>
                <Grid item md>
                    {this.getRoute()}
                </Grid>
            </Grid>
        );
    }

    handleListItemClick = (url) => {
        this.setState({redirectTo:url,isRedirect:true});
    }
}

export default withRouter(withStyles(styles)(Layout));
