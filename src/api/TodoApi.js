
import axios from 'axios';
import {JPA_API_URL} from '../api/Constants';

class TodoApi{

    findTodoList(userName){
        return axios.get(`${JPA_API_URL}${userName}`);
    }

    deleteTodoById(userName, id){
        // return axios.delete(`http://localhost:8080/todos/${userName}/${id}/delete`);
        return axios.delete(`${JPA_API_URL}${userName}/${id}/delete`);

    }

    getUpdateById(userName, id){
        return axios.get(`${JPA_API_URL}${userName}/${id}/update`);
    }

    findTodoById(userName, id){
        return axios.get(`${JPA_API_URL}${userName}/${id}/todo`, 
        // {
        //     headers : {
        //         authorization : 'Basic ' + window.btoa(userName + ":pass")
        //     }
        // }
        )
    }

    updateTodoById(userName, id, todo){
        return axios.post(`${JPA_API_URL}${userName}/${id}/update`, todo);
    }

    addNewTodo(userName, todo){
        return axios.post(`${JPA_API_URL}${userName}/add`,todo);
    }

}

export default new TodoApi();