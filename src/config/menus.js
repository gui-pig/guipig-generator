import React from 'react'

import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import FaceIcon from '@material-ui/icons/Face';
import Board from '../pages/Board';

export const menuList = [
    {
        title:"Board",
        icon: <ViewAgendaIcon/>,
        url:"/board",
        component:Board
    },{
        title:"Model",
        icon:<FaceIcon/>,
        url:"/model",
        component:Board
    }
]