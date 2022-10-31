import db from "../utils/DbUtils";

class BaseModel {
  constructor() {
    this.table = "base";
    this.id = null;
  }

  toJson() {
    return { id: this.id };
  }

  getAll(callback) {
    db.table(this.table)
      .toArray()
      .then(callback);
  }
  get(callback) {
    db.table(this.table).get({ id: Number(this.id) }, callback);
  }

  save(callback) {
    let saveData = this.toJson();
    delete saveData["id"];
    db.table(this.table)
      .add(saveData)
      .then((id) => {
        this.id = id;
        callback(this.toJson());
      });
  }

  delete(callback) {
    db.table(this.table)
      .delete(this.id)
      .then(() => callback());
  }
}

export default BaseModel;
