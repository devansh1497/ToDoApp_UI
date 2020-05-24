import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import TodoApi from '../api/TodoApi';
import AuthenticationService from '../AuthenticationService';

class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            userName : 'devansh',
            firstName : 'devansh',
            lastName : 'singh',
            password : 'password',
            confirmPassword : 'password'
        };
    }

    // componentDidMount(){
    //     const userName = AuthenticationService.findUserName();
    //     console.log(this.state.id ==-1)
    //     if(this.state.id == -1) return;
    //     TodoApi.getUpdateById(userName,this.state.id)
    //     .then(response => {
    //         // console.log(response.data.targetDate,moment(response.data.targetDate))
    //         this.setState({
    //             id : response.data.id,
    //             description : response.data.description,
    //             targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
    //         });
    //     }).catch(error => console.log(error));
    // }

    onSubmit = (values) => {
        const {userName, firstName, lastName, password} = this.state;
        TodoApi.register({
            userName,
            firstName,
            lastName,
            password
        })
        .then(()=> {this.props.history.push(`/login`)})
        .catch(error => console.log(error));
    }

    validate = (values) => {
        let errors = {}
        if(!values.userName || values.userName.length < 5){
            errors.userName = "Minimum length is 5 charaters";
        }else if(values.userName.length > 15){
            errors.userName = "Exceed maximum limit of 15 characters";
        }

        if(!values.firstName || values.firstName.length === 0){
            errors.userName = "First name is required";
        }

        if(!values.password || values.password.length < 5){
            errors.password = "Minimum length is 5 characters";
        }

        if(!values.confirmPassword || values.confirmPassword !== values.password){
            errors.confirmPassword = "Password do not match";
        }

        this.setState({
            userName : values.userName,
            firstName : values.firstName,
            lastName : values.lastName,
            password : values.password,
            confirmPassword : values.confirmPassword
        })

        return errors;
    }

    render() { 
        const {userName, firstName, lastName, password, confirmPassword} = this.state;
        return ( 
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik
                        initialValues={{userName, firstName, lastName, password, confirmPassword}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Username : </label>
                                        <Field className="form-control" type="text" name="userName"/>
                                        <ErrorMessage name="userName" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>First Name : </label>
                                        <Field className="form-control" type="text" name="firstName"/>
                                        <ErrorMessage name="firstName" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name : </label>
                                        <Field className="form-control" type="text" name="lastName"/>
                                        <ErrorMessage name="lastName" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password : </label>
                                        <Field className="form-control" type="password" name="password"/>
                                        <ErrorMessage name="password" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Confirm password : </label>
                                        <Field className="form-control" type="password" name="confirmPassword"/>
                                        <ErrorMessage name="confirmPassword" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Register</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                
            </div>
         );
    }
}
 
export default Register;