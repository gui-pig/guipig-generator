import BaseModel from "./BaseModel";

class Workspace extends BaseModel {
  constructor(id, name) {
    super();
    this.table = "workspaces";
    this.id = id;
    this.name = name;
  }

  toJson() {
    return Object.assign(super.toJson(), { name: this.name });
  }
}

export default Workspace;
