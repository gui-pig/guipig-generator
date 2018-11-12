import * as RxDB from 'rxdb';
import {schema} from "../schemas/WorkSpace";

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

export default class DbUtils {
    constructor(){

    }
    async init(){
        this.db = await cdb();
    }

    listen(){
        const sub =
            this.db.workspaces.find().sort({id: 1}).$.subscribe(workspaces => {
                if (!workspaces)
                    return;
                console.log('Reloading messages',workspaces);
                this.setState({workspaces: workspaces});
            });
        this.subs.push(sub);
    }
}