import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import InsuranceReducer from "../Reducer/insurance-reducer";
let reducers = combineReducers({
        Insurance: InsuranceReducer,
    }
)
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
