import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import common from './common'
import orders from './orders'
import customerReducer from './customerReducer';
import {sellerReducer} from './sellerReducer';
import adminReducer from './admin';

export default combineReducers({
    signup: signupReducer,
    customer: customerReducer,
    sellerReducer : sellerReducer,
    common: common,
    orders: orders,
    customer: customerReducer,
    admin: adminReducer
});