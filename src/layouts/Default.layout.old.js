import React, { Component } from 'react';

import {Switch,Route,Redirect} from "react-router-dom";
import Header from "../components/MaterialDashboard/Header/Header.jsx";
import Footer from "../components/MaterialDashboard/Footer/Footer.jsx";
import Sidebar from "../components/MaterialDashboard/Sidebar/Sidebar"

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import {menuList} from "../config/menus";



class Layout extends Component {

    constructor(props){
        super(props)
        this.state = {
            workspaces:[],
            selectedWorkspace:null,
            newWorkspace:""
        }
        this.switchRoutes = this.switchRoutes.bind(this)
    }
    switchRoutes = () => {return (
        <Switch>
            {this.getRoute().map((prop, key) => {
                if (prop.redirect)
                    return <Redirect from={prop.path} to={prop.to} key={key} />;
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    )};

    getRoute = () => {
        return (
            <Switch>
                {menuList.map((prop) => {
                    return <Route path={prop.url} component={prop.component} />;
                })}
            </Switch>);
    };

    render() {
        console.log(this.props)
        return (
            <div >
                <Sidebar
                    routes={this.getRoute()}
                    logoText={"Creative Tim"}
                    logo={logo}
                    image={image}
                    location={this.props.location}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                />
                <div ref="mainPanel">
                    <Header
                        routes={this.getRoute()}
                        handleDrawerToggle={this.handleDrawerToggle}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div>
                            <div >{this.switchRoutes()}</div>
                        </div>
                    ) : (
                        <div >{this.switchRoutes()}</div>
                    )}
                    {this.getRoute() ? <Footer /> : null}
                </div>
            </div>
        );
    }
}

export default Layout;
