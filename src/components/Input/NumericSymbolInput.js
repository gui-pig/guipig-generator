import BaseInputText from "./BaseInputText";

class NumericSymbolInput extends BaseInputText {
    constructor(props) {
        super(props)
        this.validationType = "numberSymbol";
    }
}

export default NumericSymbolInput;