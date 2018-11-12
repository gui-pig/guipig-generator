import React, { Component } from 'react';
import Select from 'react-select'
import Modal from '../components/Modal/BaseModal'
import BaseInputText from "../components/Input/BaseInputText";
import {createDatabase} from "../utils/DbUtils";
import {getActiveWorkSpace, setActiveWorkSpace} from "../utils/StorageUtils";

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {
            workspaces:[],
            selectedWorkspace:null,
            newWorkspace:""
        }
    }

    render() {
        return (
            <section className="login-block">
              Dashboard {getActiveWorkSpace()}
              <button onClick={()=>{setActiveWorkSpace(null);this.props.onRefreshWorkSpace()}}>Switch Workspace</button>
            </section>
        );
      }
}

export default Page;
