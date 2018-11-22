import React, { Component } from 'react';
import './App.css';
import WorkSpaceSwitcher from './pages/WorkSpaceSwitcher'
import Layout from './layouts/Main.layout'
import {getActiveWorkSpace} from "./utils/StorageUtils";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
const theme = createMuiTheme({
    palette: {
        primary: orange,
        success: green,
        danger: red,
    },
});
class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            activeWorkspace: getActiveWorkSpace()
        }
    }

    handleRefreshWorkSpace = ()=> {this.setState({activeWorkspace:getActiveWorkSpace()})}

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    {this.state.activeWorkspace===null || this.state.activeWorkspace==='null'?<WorkSpaceSwitcher onRefreshWorkSpace={this.handleRefreshWorkSpace}/>:<Layout onRefreshWorkSpace={this.handleRefreshWorkSpace}/>}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
