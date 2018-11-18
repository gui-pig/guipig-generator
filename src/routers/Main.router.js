import React from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router-dom';
import Main from "../layouts/Default.layout"
import Routers from "./Routers";

const Router = () => (
		<Switch>
			{/*<Route exact path='/' component={Dashb}/>*/}

			{/*Excluded routes*/}

			{/*Default route when not defined here*/}
			<Route component={Routers}/>
		</Switch>
);

export default Router;