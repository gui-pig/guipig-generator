import BaseInputText from "./BaseInputText";

class AlphanumericInput extends BaseInputText {
  constructor(props) {
    super(props);
    this.validationType = "alphabetNumber";
  }
}

export default AlphanumericInput;
