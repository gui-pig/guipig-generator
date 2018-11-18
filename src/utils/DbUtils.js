import * as RxDB from 'rxdb';
import {schema} from "../schemas/WorkSpace";
import {Component} from "react";
import Dexie from 'dexie'

const ddb = new Dexie('GPigGenDB');
ddb.version(1).stores({ workspaces: '++id,name' });


export default ddb;

const syncURL = 'http://localhost:5984/';
const dbName = 'gpgdb';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));
let rxdb = null;
async function cdb() {
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

async function aw(name) {
    if(null == rxdb)rxdb=cdb();
    const id = Date.now().toString();
    const ws = {id, name: name};
    await rxdb.workspaces.insert(ws);
}



export const createDatabase = cdb;
export const addWorkspace = aw;

export class DbUtils extends Component{
    constructor(props){
        super(props)
        this.state = {
            workspaces:[]
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

    getWorkspaces = () =>{
        return this.state.workspaces;
    }
}