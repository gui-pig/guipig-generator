import React, { Component } from 'react';
import './App.css';
import WorkSpaceSwitcher from './pages/WorkSpaceSwitcher'
import * as RxDB from 'rxdb';
import { QueryChangeDetector } from 'rxdb';
import { schema } from './schemas/WorkSpace';

const syncURL = 'http://localhost:5984/';
const dbName = 'gpgdb';

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            workspaces:[]
        }
        RxDB.plugin(require('pouchdb-adapter-idb'));
        RxDB.plugin(require('pouchdb-adapter-http'));
    }

    async componentDidMount() {
        this.db = await this.createDatabase();
        const sub =
            this.db.workspaces.find().sort({id: 1}).$.subscribe(workspaces => {
                if (!workspaces)
                    return;
                console.log('Reloading messages',workspaces);
                this.setState({workspaces: workspaces});
            });
        this.subs.push(sub);
    }

    async createDatabase() {
        const db = await RxDB.create(
            {name: dbName, adapter: 'idb', password: '12345678'}
        );
        db.waitForLeadership().then(() => {
            document.title = '♛ ' + document.title;
        });
        const workspaceCollection = await db.collection({
            name: 'workspaces',
            schema: schema
        });
        workspaceCollection.sync({ remote: syncURL + dbName + '/' });
        return db;
    }

    async addMessage() {
        const id = Date.now().toString();
        const ws = {id, name: "tes"};
        console.log(ws)
        await this.db.workspaces.insert(ws);
    }

    render() {
        return (
            <div className="App">
                <button onClick={(e)=>{
                    this.addMessage()
                }}>tes</button>
                <WorkSpaceSwitcher workspaces={this.state.workspaces}/>
            </div>
        );
    }
}

export default App;
