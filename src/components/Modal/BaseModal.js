import React, {Component} from 'react';

class BaseModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShowModal:false
        };
        this.title = this.props.title || "";
        this.buttons = this.props.buttons || [
            {
                text:"Ok",
                className:"btn-primary",
                onClick: () =>{
                    alert("ok click");
                }
            }
        ];
    }

    showModal = () =>{
        this.setState({isShowModal:true});
    }
    hideModal = () =>{
        this.setState({isShowModal:false});
    }
    triggerModal = () =>{
        this.setState({isShowModal:!this.state.isShowModal});
    }

    render(){
        return (this.state.isShowModal?[
                <div className="modal-backdrop fade show modal-stack" style={{zIndex: "1049"}}/>,
                <div className="modal show fade" id="default-Modal" tabIndex="-1"
                     style={{zIndex: 1050, display: "block", paddingRight: "0px"}} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.title}</h4>
                                <button type="button" className="close" onClick={this.hideModal} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                {this.buttons.map((b)=><button onClick={b.onClick} className={"btn waves-effect " + b.className}>{b.text}</button>)}
                            </div>
                        </div>
                    </div>
                </div>].map(c=>c):null
        );
    }
}

export default BaseModal;