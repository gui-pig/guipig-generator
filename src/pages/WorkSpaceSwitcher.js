import React, { Component } from 'react';
import Select from 'react-select'
import Modal from '../components/Modal/BaseModal'
import BaseInputText from "../components/Input/BaseInputText";

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {
            newWorkspace:""
        }
    }

  render() {
    return (
        <section className="login-block">
            <Modal
                ref={(i)=>{if(null!=i)this.showModal = i.triggerModal}}
                title={"Add Workspace"}
            >
                <BaseInputText
                    labelText={"Workspace Name"}
                    value={this.state.newWorkspace}
                    placeholder={"Workspace Name"}
                    onChange={(e)=>this.setState({newWorkspace:e.target.value})}
                />
            </Modal>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <form className="md-float-material form-material">
                            <div className="text-center">
                                <img src="../files/assets/images/logo.png" alt="logo.png"/>
                            </div>
                            <div className="auth-box card">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="text-center"><i
                                                className="icofont icofont-lock text-primary f-80"></i></h3>
                                        </div>
                                    </div>
                                    <div className="form-group form-primary">
                                            <Select
                                                options={this.props.workspaces.map((e)=>{return {key:e.id,value:e.id,label:e.name}})}
                                            />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="button"
                                                    onClick={()=>this.showModal()}
                                                    className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">
                                                <i className="icofont icofont-plus"></i> Add New Workspace
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-inverse text-right">Back to <a
                                        href="auth-sign-in-social.html">Login</a></p>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <p className="text-inverse text-left m-b-0">Thank you.</p>
                                            <p className="text-inverse text-left"><a href="index-2.html"><b>Back to
                                                website</b></a></p>
                                        </div>
                                        <div className="col-md-2">
                                            <img src="../files/assets/images/auth/Logo-small-bottom.png"
                                                 alt="small-logo.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

export default Page;
