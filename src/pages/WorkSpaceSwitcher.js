import React, { Component } from 'react';
import Select from 'react-select'
import Modal from '../components/Modal/BaseModal'
import BaseInputText from "../components/Input/BaseInputText";
import db from "../utils/DbUtils";

import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import {setActiveWorkSpace} from "../utils/StorageUtils";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography/';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
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
        minWidth: 375,
        zIndex:30
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


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

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
        db.table('workspaces')
            .toArray()
            .then((w) => this.setState({workspaces: w}))
    }

    addWorkspace() {
        const ws = {name: this.state.newWorkspace};
        db.table('workspaces')
            .add(ws)
            .then((id) => {
                this.setState({
                    newWorkspace: "",
                    workspaces: [...this.state.workspaces, Object.assign({}, ws, {id})]
                }, () => this.triggerModal());
            });
    }

    deleteWorkspace() {
        db.table('workspaces')
            .delete(this.state.selectedWorkspace.value)
            .then(() => {
                this.setState({
                    workspaces: this.state.workspaces.filter((workspace) => workspace.id !== this.state.selectedWorkspace.value),
                    selectedWorkspace: null
                });
            });
    }

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    };

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
            <Grid container md={12}>
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
                    >
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <center>GUIPIG - GENERATOR</center>
                                </Typography>
                                <center><img src="../files/assets/images/guinea-pig.png" style={{maxWidth:"30%"}} alt="logo.png"/></center>
                                <Select
                                    classes={classes}
                                    styles={selectStyles}
                                    options={suggestions}
                                    components={components}
                                    value={this.state.single}
                                    onChange={this.handleChange('single')}
                                    placeholder="Search a country (start with a)"
                                />
                                <br/>
                            </CardContent>
                        </Card>
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
