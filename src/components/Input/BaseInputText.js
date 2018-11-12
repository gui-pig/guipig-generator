import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup,InputGroup,HelpBlock} from "react-bootstrap";

class BaseInputText extends Component {

    constructor(props){
        super(props);
        this.state = {
                value: this.props.defaultValue || '',
            isValid:true
        };
        this.validationType = this.props.validation || "none";
        this.inputSuffix = this.props.inputSuffix || "";
        this.inputPrefix= this.props.inputPrefix || "";
        this.required= this.props.required || false;
        this.validationText = this.props.validationText || "";
        this.defaultValue = this.props.value || "";
    }

    additionalValidation = () => {
        return true;
    };

    validate = () =>{
        if(!this.additionalValidation())return false;
        if(this.required && (this.props.value.trim() === '' )){
            this.setState({isValid:false,validationText:"Value is Required"});
            return false;
        }
        this.setState({isValid:true});
        return true;
    };

    resetInput = (val) =>{
        if(typeof val === "undefined")
            this.setState({isValid:true,value:this.defaultValue});
        else
            this.setState({isValid:true,value:val});
    }

    validateNumber = (val) => {
        return {
            input:val,
            output:val.replace(/\D/,''),
            status:val===val.replace(/\D/,'')
        };
    };
     validateAlphabet = (val) => {
        return {
            input:val,
            output:val.replace(/[^A-Za-z ]/g,''),
            status:val===val.replace(/[^A-Za-z ]/g,'')
        };
    };
    validateAlphabetNumber = (val) => {
        return {
            input:val,
            output:val.replace(/[^A-Za-z0-9 ]/g,''),
            status:val===val.replace(/[^A-Za-z0-9 ]/g,'')
        };
    };
    validateNumberSymbol = (val) => {
        return {
            input:val,
            output:val.replace(/[^0-9._-]/g,''),
            status:val===val.replace(/[^0-9._-]/g,'')
        };
    };
    validateAlphabetSymbol = (val) => {
        return {
            input:val,
            output:val.replace(/[^a-zA-Z._-]/g,''),
            status:val===val.replace(/[^a-zA-Z0-9._-]/g,'')
        };
    };


    // static getDerivedStateFromProps(props,state){
    //     if (props.defaultValue !== state.value) {
    //         return {
    //             value: props.defaultValue
    //         };
    //     }
    //     return null;
    // }

    onChange = (e) =>{
        let tempValue = e.target.value;
        if(this.validationType === 'number'){
            this.setState({isValid:this.validateNumber(tempValue).status})
            tempValue = this.validateNumber(tempValue).output;
        }else if(this.validationType === 'alphabet'){
            this.setState({isValid:this.validateAlphabet(tempValue).status})
            tempValue = this.validateAlphabet(tempValue).output;
        }else if(this.validationType === 'alphabetNumber'){
            this.setState({isValid:this.validateAlphabetNumber(tempValue).status})
            tempValue = this.validateAlphabetNumber(tempValue).output;
        }else if(this.validationType === 'numberSymbol'){
            this.setState({isValid:this.validateNumberSymbol(tempValue).status})
            tempValue = this.validateNumberSymbol(tempValue).output;
        }else if(this.validationType === 'alphabetSymbol'){
            this.setState({isValid:this.validateAlphabetSymbol(tempValue).status})
            tempValue = this.validateAlphabetSymbol(tempValue).output;
        }
        this.setState({value:tempValue,validationText:this.validationText},()=>setTimeout(()=>this.setState({isValid:true}), 4000));
        e.target.value = tempValue;
        if(this.props.onChange)this.props.onChange(e);
    };

    render(){
        let validationStyle = this.props.validationStyle||{fontSize:"11px"};
        if(this.props.validationColor && typeof  validationStyle.color === 'undefined' )validationStyle = Object.assign(validationStyle,{color:this.props.validationColor});
        return(
            <FormGroup validationState={this.state.isValid?null:"error"} controlId="1">
                {typeof this.props.labelText === 'undefined'?null:<ControlLabel style={{textAlign:"left !important"}}>{this.props.labelText}</ControlLabel>}
                <InputGroup>
                    {(this.inputPrefix === '')?null:<InputGroup.Addon>{this.inputPrefix}</InputGroup.Addon>}
                        <FormControl disabled={this.props.disabled||false} onKeyPress={this.props.onKeyPress} onChange={this.onChange} style = {{textAlign:(this.validationType === 'number')?"right":"left"}} type="text" placeholder={this.props.placeholder} value={this.props.value}/>
                    {(this.inputSuffix === '')?null:<InputGroup.Addon>{this.inputSuffix}</InputGroup.Addon>}
                </InputGroup>
                {this.state.isValid?null:<HelpBlock style={validationStyle}>{this.state.validationText}</HelpBlock>}
            </FormGroup>);
    }
}

export default BaseInputText;
