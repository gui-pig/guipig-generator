import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Model from '../models/Model';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
// import ArrowLeftIcon from '@material-ui/icons/ChevronLeft';
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import AlphanumericInput from "../components/Input/AlphanumericInput";
import {FormControl,FormGroup} from "react-bootstrap";


let id = 0;
function createData(name, type, fat, carbs, unique, primary) {
    id += 1;
    return { id, name, type, fat, carbs, unique, primary };
}

const rows = [
    createData('Frozen yoghurt', "integer", 6.0, 24, true),
    createData('Ice cream sandwich', "string", 9.0, 37, true),
    createData('Eclair', "integer", 16.0, 24, false),
    createData('Cupcake', "string", 3.7, 67, false),
    createData('Gingerbread', "integer", 16.0, 49, true),
];


const typeOptions = [
    { value: 'integer', label: 'Integer' },
    { value: 'string', label: 'String' }
];

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {
            model:{

            },
            value:0
        }
        this.id = this.props.match.params.id;
    }

    componentDidMount = () =>{
        this.refresh();
    }

    refresh = () => {
        new Model(this.id).get((m)=>this.setState({model:m}));
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    render() {
        return (
            <Grid md={12} container>
                <Grid style={{maxHeight:"120px"}} item md={12}>
                    <Typography style={{display:"inline-block",marginLeft:10}} variant="h4" gutterBottom>
                        {/*<IconButton color="default" mini aria-label="Add">*/}
                            {/*<ArrowLeftIcon />*/}
                        {/*</IconButton>&nbsp;*/}
                        Model: {this.state.model.name}
                    </Typography>
                    <Link to={"/model"}>
                        <Button size="small" variant="outlined"style={{float:"right"}}
                                color="primary">
                            Back To List
                        </Button>
                    </Link>
                </Grid>
                <Grid item style={{marginBottom:"100%",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    backgroundColor: "white",
                    }} md={12}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Fields" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis='x'
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div" style={{ padding: 8 * 3 }}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell style={{width:"10%"}}>Length</TableCell>
                                        <TableCell style={{width:"18%"}}>Default</TableCell>
                                        <TableCell>Nullable</TableCell>
                                        <TableCell>Unique</TableCell>
                                        <TableCell>Primary</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell style={{verticalAlign:"center"}} component="td" scope="row" padding={"checkbox"}>
                                                    <AlphanumericInput formGroupStyle={{margin:0}}/>
                                                    {/*<TextField*/}
                                                        {/*autoFocus*/}
                                                        {/*onKeyPress={(e)=>{*/}
                                                            {/*if (e.key === 'Enter') {*/}
                                                                {/*this.addWorkspace();*/}
                                                            {/*}*/}
                                                        {/*}}*/}
                                                        {/*value={row.name}*/}
                                                        {/*// onChange={(e)=>this.setState({newWorkspace:e.target.value})}*/}
                                                        {/*margin="dense"*/}
                                                        {/*id="name"*/}
                                                        {/*type="text"*/}
                                                        {/*fullWidth*/}
                                                    {/*/>*/}
                                                </TableCell>
                                                <TableCell padding={"checkbox"}>
                                                    {/*<Select*/}
                                                        {/*options={typeOptions}*/}
                                                        {/*onChange={(selectedOption) => {*/}
                                                                {/*this.setState({ selectedOption });*/}
                                                                {/*console.log(`Option selected:`, selectedOption);*/}
                                                        {/*}}*/}
                                                        {/*value={row.type}*/}
                                                    {/*/>*/}

                                                    <FormGroup style={{margin:0}} controlId="formControlsSelect">
                                                        <FormControl componentClass="select" placeholder="select">
                                                            <option value="select">Integer</option>
                                                            <option value="other">String</option>
                                                        </FormControl>
                                                    </FormGroup>
                                                </TableCell>
                                                <TableCell padding={"checkbox"}>
                                                    <AlphanumericInput formGroupStyle={{margin:0}}/>
                                                    {row.length}
                                                </TableCell>
                                                <TableCell padding={"checkbox"}>
                                                    <AlphanumericInput formGroupStyle={{margin:0}}/>
                                                    {row.defaultValue}
                                                </TableCell>
                                                <TableCell padding={"checkbox"}><Checkbox checked={row.nullable}/></TableCell>
                                                <TableCell padding={"checkbox"}><Checkbox checked={row.unique}/></TableCell>
                                                <TableCell padding={"checkbox"}><Checkbox checked={row.primaryKey}/></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow key={-1}>
                                        <TableCell colSpan={6} component="th" scope="row">
                                            <center >
                                                <Button style={{marginTop:"10px",marginBottom:"10px"}} onClick={()=>this.triggerDialog()} variant="contained" color="secondary">
                                                    <AddIcon/>
                                                    Add New Field
                                                </Button>
                                            </center>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Typography>
                        <Typography component="div" style={{ padding: 8 * 3 }}>
                        tes
                        </Typography>
                    </SwipeableViews>
                </Grid>
            </Grid>
        );
    }
}

export default Page;
