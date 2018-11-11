import BaseInputText from "./BaseInputText";

class AlphabeticalInput extends BaseInputText {
    constructor(props) {
        super(props)
        this.validationType = "alphabet"
    }
}

export default AlphabeticalInput;