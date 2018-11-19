import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

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
        const { classes,children } = this.props;
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.isShowModal}
                onClose={this.hideModal}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    {children}
                </div>
            </Modal>
        );
    }
}

export default withStyles(styles)(BaseModal);