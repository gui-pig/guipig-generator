import React, { Component } from 'react';
import './App.css';
import WorkSpaceSwitcher from './pages/WorkSpaceSwitcher'
import Dashboard from './pages/Dashboard'
import {getActiveWorkSpace} from "./utils/StorageUtils";

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
            <div className="App">
                {this.state.activeWorkspace===null || this.state.activeWorkspace==='null'?<WorkSpaceSwitcher onRefreshWorkSpace={this.handleRefreshWorkSpace}/>:<Dashboard onRefreshWorkSpace={this.handleRefreshWorkSpace}/>}
            </div>
        );
    }
}

export default App;
