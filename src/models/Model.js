import BaseModel from "./BaseModel";

class Model extends BaseModel {
  constructor(id, idWorkspace, name, description) {
    super();
    this.table = "models";
    this.id = id;
    this.idWorkspace = idWorkspace;
    this.name = name;
    this.description = description;
  }

  toJson() {
    return Object.assign(super.toJson(), {
      idWorkspace: this.idWorkspace,
      name: this.name,
      description: this.description,
    });
  }
}

export default Model;
