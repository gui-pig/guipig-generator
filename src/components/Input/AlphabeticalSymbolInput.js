import BaseInputText from "./BaseInputText";

class AlphabeticalSymbolInput extends BaseInputText {
  constructor(props) {
    super(props);
    this.validationType = "alphabetSymbol";
  }
}

export default AlphabeticalSymbolInput;
