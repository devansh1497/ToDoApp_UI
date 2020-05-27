import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './index';
import thunkMiddleware from 'redux-thunk'
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWare = [reduxThunk];

const store = createStore(
    rootReducer,composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;