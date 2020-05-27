
import {TODO_REQUEST} from '../actions/TodosAction';
import {TODO_FAILURE} from '../actions/TodosAction';
import {TODO_SUCCESS} from '../actions/TodosAction';

export default function TodosReducer(state, action){
    state = {
        todos : [],
        isError : false,
        isFetching : false
    }
    switch(action.type){
        case TODO_REQUEST:
            console.log('req',action.todos)
            return Object.assign({},state,{
                todos : [],
                isError : action.isError,
                isFetching : action.isFetching
            });
        case TODO_SUCCESS:
            console.log('success',action.todos)
            return Object.assign(state,{},{
                todos : action.todos,
                isError : action.isError,
                isFetching : action.isFetching
            });
        case TODO_FAILURE:
            return Object.assign(state,{},{
                todos : [],
                isError : action.isError,
                isFetching : action.isFetching
            });

        default:
            return state
    }
}

