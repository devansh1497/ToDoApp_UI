
import React, { Component } from 'react';
import TodoApi from '../api/TodoApi.js';
import AuthenticationService from '../AuthenticationService.js';
import '../App.css';
import moment from 'moment';

class ListTodos extends Component {
    state = { 
        todo: [],   
        deleteStatus: null
     };


    componentDidMount(){
        
        this.refreshTodoList(AuthenticationService.findUserName());
    }

    refreshTodoList(userName){
        TodoApi.findTodoList(userName)
        .then(response => {
            this.setState({
                todo : response.data
            })
        })
        .catch(error => console.log('error->',error.message));
    }

    handleDelete = (id)=>{
        const userName = AuthenticationService.findUserName();
        TodoApi.deleteTodoById(userName,id)
        .then(resp => this.refreshTodoList(userName))
        .then(resp =>this.setState({
            deleteStatus : true
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
                        {this.state.deleteStatus !== null && !this.state.deleteStatus && <div className="alert alert-success delete-status">An error occurred.</div>}
                        <tbody>
                        {this.state.todo.map(t =>
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.status ? "Yes" : "No"}</td>
                                <td>{moment(t.targetDate).format("DD-MM-YYYY")}</td>
                                <td><button className="btn btn-success" onClick={() =>this.handleUpdate(t.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.handleDelete(t.id)}>Delete</button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-success" onClick={()=>this.handleUpdate(-1)}>Add</button>
            </div>
         );
    }
}
 
export default ListTodos;