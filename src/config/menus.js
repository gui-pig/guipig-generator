import React from "react";

import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import FaceIcon from "@material-ui/icons/Face";
import BuildIcon from "@material-ui/icons/Build";
import Board from "../pages/Board";
import Model from "../pages/Model";

export const menuList = [
  {
    title: "Board",
    icon: <ViewAgendaIcon />,
    url: "/board",
    component: Board,
  },
  {
    title: "Model",
    icon: <FaceIcon />,
    url: "/model",
    component: Model,
  },
  {
    title: "Setting",
    icon: <BuildIcon />,
    url: "/settings/",
    component: Model,
  },
];
