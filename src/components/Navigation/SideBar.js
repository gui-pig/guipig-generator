import React, { Component } from 'react';
import {menuList} from "../../config/menus";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class Sidebar extends Component {

    render() {
        return (<List>
                {menuList.map((m)=><ListItem
                    button
                    onClick={event => this.props.handleListItemClick(m.url,m.title)}>
                    <ListItemIcon
                        // style={{color:"white"}}
                    >
                        {m.icon}
                    </ListItemIcon>
                    <ListItemText
                        // primaryTypographyProps={{style:{color:"white"}}}
                        primary={m.title} />
                </ListItem>)}
            </List>
          );
    }
}

export default Sidebar;
