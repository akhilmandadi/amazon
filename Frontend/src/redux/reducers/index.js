import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import customerReducer from './customerReducer';
import sellerReducer from './sellerReducer';

export default combineReducers({
    signup: signupReducer,
    customer: customerReducer,
    seller : sellerReducer
});