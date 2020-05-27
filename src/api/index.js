import { combineReducers } from "redux";
import TodosReducer from './reducer/TodosReducer'


const rootReducer = combineReducers({
    todos : TodosReducer
})

export default rootReducer;