import BaseInputText from "./BaseInputText";

class NumericInput extends BaseInputText {
  constructor(props) {
    super(props);
    this.validationType = "number";
    this.validationText = "Input must be number only";
  }
}

export default NumericInput;
