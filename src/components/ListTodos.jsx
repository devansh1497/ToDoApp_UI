
import React, { Component } from 'react';
import TodoApi from '../api/TodoApi.js';
import AuthenticationService from '../AuthenticationService.js';
import '../App.css';
import moment from 'moment';
import PopUp from './Popup.jsx';
import loadTodos from '../api/actions/TodosAction';
import {connect} from 'react-redux';
import '../styling/ListTodos.scss';
import Loader from './Loader';

class ListTodos extends Component {
    state = { 
        todo: [],   
        deleteStatus: null,
        showDeleteModal : false,
        deleteId : null
     };


    componentDidMount(){
        
        // this.refreshTodoList(AuthenticationService.findUserName());
        console.log(this.props)
        this.props.dispatch(loadTodos(AuthenticationService.findUserName()));
    }

    toggleDeleteModal = () => {
        this.setState({
            showDeleteModal : !this.state.showDeleteModal
        })
    }

    refreshTodoList(userName){
        this.props.dispatch(loadTodos(AuthenticationService.findUserName()));
    }

    handleDeleteButton = (id) => {
        this.setState({
            showDeleteModal : true,
            deleteId : id
        })
    }

    resetDeleteId = () => {
        this.setState({
            deleteId : null
        })
    }

    handleDelete = (id)=>{
        const userName = AuthenticationService.findUserName();
        console.log('resey delete id')
        TodoApi.deleteTodoById(userName,id)
        .then(resp => this.refreshTodoList(userName))
        .then(resp =>this.setState({
            deleteStatus : true,
            deleteId : null
        }))
        .catch(error =>this.setState({
            deleteStatus: false
        }));

        setTimeout(() => {
            this.setState({
                deleteStatus : null
            });
        }, 3000);
    }

    handleUpdate = (id) => {
        const userName = AuthenticationService.findUserName();
        this.props.history.push(`/todos/${userName}/${id}/update`)
    }

    render() { 
        const {todos} = this.props;
        return ( 
            <div>
                <h1>ToDo items...</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done?</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        {this.state.deleteStatus && <div className="alert alert-success delete-status">Deleted</div>}
                        {this.state.deleteStatus !== null && !this.state.deleteStatus && <div className="alert alert-danger delete-status">An error occurred.</div>}
                        <tbody>
                        {todos.isFetching && <Loader/>}
                        {todos.isError && <label className="error-text">Service is down. Please try again later.</label>}
                        {!todos.isFetching && !todos.isError && todos.todos.map(t =>
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.status ? "Yes" : "No"}</td>
                                <td>{moment(t.targetDate).format("DD-MM-YYYY")}</td>
                                <td><button className="btn btn-success" onClick={() =>this.handleUpdate(t.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.handleDeleteButton(t.id)}>Delete</button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {this.state.showDeleteModal && this.state.deleteId && <PopUp resetDeleteId={this.resetDeleteId} deleteId={this.state.deleteId} handleDelete={this.handleDelete} toggleDeleteModal={this.toggleDeleteModal}/>}
                </div>
                <button className="btn btn-success" onClick={()=>this.handleUpdate(-1)}>Add</button>
            </div>
         );
    }

}

function mapStateToProps(state){
    return {todos : state.todos}
}
export default connect(mapStateToProps)(ListTodos);