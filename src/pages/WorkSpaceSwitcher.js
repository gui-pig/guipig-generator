import React, { Component } from 'react';
import Select from 'react-select'
import Modal from '../components/Modal/BaseModal'
import FormDialog from '../components/Dialog/FormDialog'
import BaseInputText from "../components/Input/BaseInputText";
import db from "../utils/DbUtils";

import CancelIcon from '@material-ui/icons/Cancel';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import {setActiveWorkSpace} from "../utils/StorageUtils";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography/';
import Workspace from "../models/Workspace";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    container:{
        background: "#fff",
        minHeight:"320px",
        marginBottom:"80%",
        borderRadius: "2px",
        padding:"20px",
        display: "inline-block",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    button:{
        width:"100%"
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    card: {
        position:"relative !important",
        minWidth: 375,
        zIndex:20
    },
    cardChild: {
        position:"relative !important",
        zIndex:30000
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}


const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class Page extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workspaces: [],
            selectedWorkspace: null,
            newWorkspace: ""
        }
    }

    componentDidMount() {
        new Workspace().getAll((w) => this.setState({workspaces: w}))
    }

    addWorkspace() {
        new Workspace(null,this.state.newWorkspace).save((ws) => {
            this.setState({
                newWorkspace: "",
                workspaces: [...this.state.workspaces, Object.assign({}, ws)]
            }, () => this.triggerDialog());
        });

    }

    deleteWorkspace() {
        new Workspace(this.state.selectedWorkspace.value).delete(()=>{
            this.setState({
                workspaces: this.state.workspaces.filter((workspace) => workspace.id !== this.state.selectedWorkspace.value),
                selectedWorkspace: null
            });
        })
    }

    handleChangeWorkspace = (selectedOption) => {
        this.setState({selectedWorkspace: selectedOption});
    }

    render() {
        const { classes,theme } = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        return (
            <Grid container md={12} style={{minHeight:"100vh"}}>
                <FormDialog
                    ref={(i)=>{if(null!=i)this.triggerDialog = i.triggerDialog}}
                    title={"Add Workspace"}
                    buttons={[
                        {
                            text:"Cancel",
                            color:"primary",
                            onClick: ()=>this.triggerDialog()
                        },
                        {
                            text:"Add",
                            color:"primary",
                            onClick: ()=>this.addWorkspace()
                        }
                    ]}
                >
                    <TextField
                        autoFocus
                        onKeyPress={(e)=>{
                            if (e.key === 'Enter') {
                                this.addWorkspace();
                            }
                        }}
                        value={this.state.newWorkspace}
                        onChange={(e)=>this.setState({newWorkspace:e.target.value})}
                        margin="dense"
                        id="name"
                        label="Workspace Name"
                        type="text"
                        fullWidth
                    />
                </FormDialog>
                <Grid
                    md={2}
                />
                <Grid
                    md={8}
                    container
                    style={{marginTop:"100px"}}
                >
                    <Grid
                        md={3}
                    />
                    <Grid
                        md={6}
                        container
                        className={classes.container}
                    >
                        <Grid md={12}>
                            <Typography variant="h5" component="h2">
                                <center>GUIPIG - GENERATOR</center>
                            </Typography>
                            <center><img src="../files/assets/images/guinea-pig.png" style={{maxWidth:"30%"}} alt="logo.png"/></center>
                        </Grid>
                        <Grid md={12} style={{marginTop:"20px"}}>
                            <Select
                                classes={classes}
                                styles={selectStyles}
                                value={this.state.selectedWorkspace}
                                onChange={this.handleChangeWorkspace}
                                options={this.state.workspaces.map((e)=>{return {key:e.id,value:e.id,label:e.name}})}
                                components={components}
                                placeholder="Select a workspace"
                            />
                        </Grid>
                        <Grid md={12} container style={{marginTop:"20px"}}>
                            {this.state.selectedWorkspace!==null?[<Grid md={6}>
                                <Button variant="contained"  style={{marginRight:"5px",backgroundColor:red.A700,color:"white"}} onClick={()=>this.deleteWorkspace()} color="default" className={classes.button}>
                                    <RemoveIcon></RemoveIcon>
                                    Delete Workspace
                                </Button>
                            </Grid>,
                                <Grid md={6}>
                                    <Button variant="contained" style={{marginLeft:"5px",backgroundColor:green.A700,color:"white"}} onClick={()=>{setActiveWorkSpace(this.state.selectedWorkspace.value);this.props.onRefreshWorkSpace()}} color="default" className={classes.button}>
                                        <ArrowRightIcon></ArrowRightIcon>
                                        Go To Workspace
                                    </Button>
                                </Grid>].map(c=>c):null}
                            <Grid md={12} style={{marginTop:"10px",marginBottom:"20px"}}>
                                <Button onClick={()=>this.triggerDialog()} variant="contained" color="secondary" className={classes.button}>
                                    <AddIcon/>
                                    Add New Workspace
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        md={3}
                    />
                </Grid>
                <Grid
                    md={2}
                />
            </Grid>
        )
    }

}


export default withStyles(styles,{ withTheme: true })(Page);
