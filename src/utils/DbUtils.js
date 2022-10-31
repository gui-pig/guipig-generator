import * as RxDB from "rxdb";
import { schema } from "../schemas/WorkSpace";
import { Component } from "react";
import Dexie from "dexie";

const db = new Dexie("GPigGenDB");
db.version(2).stores({ models: "++id,name,description,idWorkspace" });
db.version(1).stores({ workspaces: "++id,name" });

export default db;
