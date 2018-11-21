import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormDialog from '../components/Dialog/FormDialog';
import TextField from '@material-ui/core/TextField';


import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Model from "../models/Model";
import {getActiveWorkSpace} from "../utils/StorageUtils";

class Page extends Component {

    constructor(props){
        super(props)
        this.state = {
            models:[],
            newName:"",
            newDescription:""
        }
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = (callback) =>{
        new Model().getAll((m) => this.setState({models: m,newName:"",newDescription:""},callback))
    };

    ModelCard = (id,name,description) =>{
        return  <Grid item md={3} style={{maxHeight:"200px"}} >
            <Card style={{
                maxHeight:"200px",
                marginLeft:10,
                marginRight:10,
                minWidth: "80%"
            }}>
                <Link to={"/model/" + String(id)} style={{
                    textDecoration:"none"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography align="center" variant="h5" component="h2">
                                {name}
                            </Typography>
                            <Typography style={{marginTop: 12}} align="center" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <Grid md={12}>
                        <Button size="small" style={{backgroundColor:red.A700,color:"white"}}
                                onClick={()=>this.deleteModel(id)} color="default">
                            Delete
                        </Button>
                        <Link to={"/model/" + String(id)} style={{
                            textDecoration:"none"}}>
                            <Button size="small" style={{float:"right",backgroundColor:green.A700,color:"white"}} color="primary">
                                Edit
                            </Button>
                        </Link>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    }

    render() {
        return (
                <Grid md={12} container>
                    <FormDialog
                        ref={(i)=>{if(null!=i)this.triggerDialog = i.triggerDialog}}
                        title={"Add Model"}
                        buttons={[
                            {
                                text:"Cancel",
                                color:"primary",
                                onClick: ()=>this.triggerDialog()
                            },
                            {
                                text:"Add",
                                color:"primary",
                                onClick: ()=>this.handleAddModel()
                            }
                        ]}
                    >
                        <TextField
                            autoFocus
                            onKeyPress={(e)=>{
                                if (e.key === 'Enter') {
                                    this.handleAddModel();
                                }
                            }}
                            value={this.state.newName}
                            onChange={(e)=>this.setState({newName:e.target.value})}
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            onKeyPress={(e)=>{
                                if (e.key === 'Enter') {
                                    this.handleAddModel();
                                }
                            }}
                            value={this.state.newDescription}
                            onChange={(e)=>this.setState({newDescription:e.target.value})}
                            margin="dense"
                            id="name"
                            rowsMax={30}
                            label="Description"
                            type="text"
                            fullWidth
                        />
                        <br/>
                    </FormDialog>
                    <Grid style={{maxHeight:"120px"}} item md={12}>
                        <Typography style={{display:"inline-block",marginLeft:10}} variant="h4" gutterBottom>
                            Model List
                        </Typography>
                        <Button size="small" onClick={()=>this.triggerDialog()} style={{float:"right",backgroundColor:green.A700,color:"white"}}
                                 color="default">
                            Add Model
                        </Button>
                    </Grid>
                    <Grid style={{marginBottom:"100%"}} container md={12}>
                        {this.state.models.length === 0 ?<Typography style={{marginLeft:10}} variant={"h7"}>There is no model</Typography>:this.state.models.map((m)=>this.ModelCard(m.id,m.name,m.description))}
                    </Grid>
                </Grid>
        );
    }

    handleAddModel = () => {
        new Model(null,getActiveWorkSpace(),this.state.newName,this.state.newDescription).save((model)=>{
            this.refresh(()=>this.triggerDialog())
        });
    }

    deleteModel = (id) => {
        new Model(id).delete((model)=>{
            this.refresh()
        });
    }
}

export default Page;
