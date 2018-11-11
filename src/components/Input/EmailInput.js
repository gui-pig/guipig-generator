import BaseInputText from "./BaseInputText";

class EmailInput extends BaseInputText {
    constructor(props) {
        super(props)
        this.validationType = "none";
        this.required = true;
    }

    additionalValidation = () => {
        this.setState({isValid:false,validationText:"Email is not valid!"});
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(this.state.value).toLowerCase())){
            return false;
        }
        return true;
    }

}

export default EmailInput;