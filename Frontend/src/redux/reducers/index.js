import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import common from './common'
import orders from './orders'
import customerReducer from './customerReducer';

export default combineReducers({
    signup: signupReducer,
    common: common,
    orders: orders,
    customer: customerReducer
});