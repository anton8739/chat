import {applyMiddleware, combineReducers, createStore} from "redux";
import AccountReducer from "./redusers/AccountReducer";
import thunkMW from 'redux-thunk';
import DialogReducer from "./redusers/DialogReducer";
import {reducer as formReducer} from 'redux-form';
import AuthReducer from "./redusers/AuthReducer";
let reducers =combineReducers({
    account : AccountReducer,
    dialog :DialogReducer,
    auth : AuthReducer,
    form : formReducer
}
);

export let store=createStore(reducers,applyMiddleware(thunkMW));