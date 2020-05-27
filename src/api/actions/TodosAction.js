import Axios from "axios";
import axios from 'axios';
import { JPA_API_URL } from "../Constants";

export const TODO_REQUEST = "TODO_REQUEST";
export const TODO_SUCCESS = "TODO_SUCCESS";
export const TODO_FAILURE = "TODO_FAILURE";


function todosRequest(){
    return ({
        type : TODO_REQUEST,
        todos : [],
        isFetching : true,
        isError : false
    })
}

function todosSuccess(data){
    return ({
        type : TODO_SUCCESS,
        todos : data,
        isFetching : false,
        isError : false
    })
}

function todosFailure(){
    return ({
        type : TODO_FAILURE,
        todos : [],
        isFetching : false,
        isError : true
    })
}

export default function loadTodos(userName){
    return dispatch => {
        dispatch(todosRequest());
        const url = `${JPA_API_URL}${userName}`;
        axios.get(url)
        .then(resp => {
            if(resp.status === 200){
                dispatch(todosSuccess(resp.data));
            }
            console.log(resp)
        })
        .catch(() => {
            dispatch(todosFailure());
        })
    }
}