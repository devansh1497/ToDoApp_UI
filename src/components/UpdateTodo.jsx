import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import TodoApi from '../api/TodoApi';
import AuthenticationService from '../AuthenticationService';

class UpdateTodo extends Component {
    constructor(props){
        super(props);

        this.state={
            id : this.props.match.params.id,
            description : "Todo description",
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount(){
        const userName = AuthenticationService.findUserName();
        console.log(this.state.id ==-1)
        if(this.state.id == -1) return;
        TodoApi.getUpdateById(userName,this.state.id)
        .then(response => {
            // console.log(response.data.targetDate,moment(response.data.targetDate))
            this.setState({
                id : response.data.id,
                description : response.data.description,
                targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
            });
        }).catch(error => console.log(error));
    }

    onSubmit = (values) => {
        const userName = AuthenticationService.findUserName();
        TodoApi.updateTodoById(userName, this.state.id, {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        })
        .then(()=> {this.props.history.push(`/todos/${userName}`)})
        .catch(error => console.log(error));
    }

    validate = (values) => {
        let errors = {}
        if(!values.description){
            errors.description = "Enter a description";
        }else if(values.description.length < 5){
            errors.description = "Enter atleast 5 characters";
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date";
        }

        return errors;
    }

    render() { 
        const description = this.state.description;
        const targetDate = this.state.targetDate;
        return ( 
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik
                        initialValues={{targetDate , description}}
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
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                        <ErrorMessage name="description" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                        <ErrorMessage name="targetDate" className="alert alert-danger" component="div"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                
            </div>
         );
    }
}
 
export default UpdateTodo;