import React from "react";
import { Switch, Route } from "react-router-dom";
import { menuList } from "../config/menus";
import Board from "../pages/Board";
import ModelDetail from "../pages/ModelDetail";

const Router = () => (
  <Switch>
    {menuList.map((prop) => {
      return <Route exact path={prop.url} component={prop.component} />;
    })}
    <Route path={"/model/:id"} component={ModelDetail} />
    <Route component={Board} />
  </Switch>
);

export default Router;
