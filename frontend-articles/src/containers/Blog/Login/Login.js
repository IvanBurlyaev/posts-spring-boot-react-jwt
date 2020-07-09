import React, {Component} from 'react';
import Input from "../../../components/Input/Input";
import './Login.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/authActions';
import Spinner from "../../../components/Spinner/Spinner";
import {Redirect} from "react-router-dom";

class Login extends Component {

    state = {
        loginForm: {
            username: {
                label: 'Username',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Username'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {...this.state.loginForm};

        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
    }

    submitDataHandler = () => {
        this.props.onAuthenticate(this.state.loginForm.username.value, this.state.loginForm.password.value);
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    render() {

        let inputElements = [];

        for (let key in this.state.loginForm) {
            inputElements.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        const inputs = inputElements.map(element => {
            return <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                label={element.config.label}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)}/>
        });

        const authRedirect = this.props.isAuthenticated ? <Redirect to="/posts"/> : null;

        return this.props.loading ? <Spinner/> : <div className="Login">
            {authRedirect}
            <h1>Login</h1>
            {this.props.error ? <p style={{color: 'red'}}>{this.props.errorMessage}</p> : null}
            {inputs}
            <button disabled={!this.state.formIsValid} onClick={this.submitDataHandler}>Login</button>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        errorMessage: state.auth.errorMessage,
        isAuthenticated: state.auth.token !== null,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username, password) => dispatch(actionCreators.authenticate(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);