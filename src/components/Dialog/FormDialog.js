import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    triggerDialog = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const {title,contentText,children,buttons} = this.props
        return (<Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {contentText?<DialogContentText>
                                {contentText}
                        </DialogContentText>:null}
                        {children}
                    </DialogContent>
                    <DialogActions>
                        {buttons.map((b)=><Button onClick={b.onClick} color={b.color}>
                            {b.text}
                        </Button>)}
                    </DialogActions>
                </Dialog>
        );
    }
}