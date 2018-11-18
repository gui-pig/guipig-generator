import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {menuList} from "../config/menus";
import Board from '../pages/Board';

const Router = () => (
    <Switch>
        {menuList.map((prop) => {
            return <Route path={prop.url} component={prop.component} />;
        })}
        <Route component={Board} />
    </Switch>
);

export default Router;