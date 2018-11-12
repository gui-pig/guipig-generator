import React, { Component } from 'react';
import Select from 'react-select'
import Modal from '../components/Modal/BaseModal'
import BaseInputText from "../components/Input/BaseInputText";
import {createDatabase} from "../utils/DbUtils";
import {setActiveWorkSpace} from "../utils/StorageUtils";

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {
            workspaces:[],
            selectedWorkspace:null,
            newWorkspace:""
        }
    }

    async componentDidMount() {
        this.db = await createDatabase();
        const sub =
            this.db.workspaces.find().sort({id: 1}).$.subscribe(workspaces => {
                if (!workspaces)
                    return;
                this.setState({workspaces: workspaces});
            });
        this.subs.push(sub);
    }

    async addWorkspace() {
        const id = Date.now().toString();
        const ws = {id, name: this.state.newWorkspace};
        await this.db.workspaces.insert(ws);
        this.setState({newWorkspace:""},()=>this.triggerModal())
    }

    async deleteWorkspace(){
        await this.db.workspaces.find().where('id').eq(this.state.selectedWorkspace.value).remove()
        this.setState({selectedWorkspace:null});
    }


    handleChangeWorkspace = (selectedOption) => {
        this.setState({selectedWorkspace:selectedOption});
    }

    render() {
        return (
            <section className="login-block">
                <Modal
                    ref={(i)=>{if(null!=i)this.triggerModal = i.triggerModal}}
                    buttons={[
                        {
                            text:"Cancel",
                            className:"btn-warning",
                            onClick: ()=>this.triggerModal()
                        },
                        {
                            text:"Add",
                            className:"btn-primary",
                            onClick: ()=>this.addWorkspace()
                        }
                    ]}
                    title={"Add Workspace"}
                >
                    <BaseInputText
                        onKeyPress={(e)=>{
                            if (e.key === 'Enter') {
                                this.addWorkspace();
                            }
                        }}
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
                                    <h2 style={{fontFamily:"'Varela Round',sans-serif",color:"#ffb92b"}}>GUIPIG - GENERATOR</h2>
                                </div>
                                <div className="auth-box card">
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 className="text-center">
                                                    <img src="../files/assets/images/guinea-pig.png" style={{maxWidth:"30%"}} alt="logo.png"/>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="form-group form-primary">
                                                <Select
                                                    placeholder={"Select Workspace ..."}
                                                    value={this.state.selectedWorkspace}
                                                    onChange={this.handleChangeWorkspace}
                                                    options={this.state.workspaces.map((e)=>{return {key:e.id,value:e.id,label:e.name}})}
                                                />
                                        </div>
                                        <div className="row">
                                            {this.state.selectedWorkspace!==null?[<div className="col-md-6">
                                                <button type="button"
                                                        onClick={()=>this.deleteWorkspace()}
                                                        className="btn btn-danger btn-md btn-block waves-effect text-center m-b-20">
                                                    <i className="icofont icofont-trash"></i> Delete Workspace
                                                </button>
                                            </div>,
                                            <div className="col-md-6">
                                                <button type="button"
                                                        onClick={()=>{setActiveWorkSpace(this.state.selectedWorkspace.value);this.props.onRefreshWorkSpace()}}
                                                        className="btn btn-success btn-md btn-block waves-effect text-center m-b-20">
                                                    <i className="icofont icofont-arrow-right"></i> Go To Workspace
                                                </button>
                                            </div>].map(c=>c):null}
                                            <div className="col-md-12">
                                                <button type="button"
                                                        onClick={()=>this.triggerModal()}
                                                        className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">
                                                    <i className="icofont icofont-plus"></i> Add New Workspace
                                                </button>
                                            </div>
                                        </div>
                                         {/*<div className="row">*/}
                                            {/*<div className="col-md-10">*/}
                                                {/*<p className="text-inverse text-left m-b-0">Thank you.</p>*/}
                                                {/*<p className="text-inverse text-left"><a href="index-2.html"><b>Back to*/}
                                                    {/*website</b></a></p>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-md-2">*/}
                                                {/*<img src="../files/assets/images/auth/Logo-small-bottom.png"*/}
                                                     {/*alt="small-logo.png"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
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
