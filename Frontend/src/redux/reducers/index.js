import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import customerReducer from './customerReducer';

export default combineReducers({
    signup: signupReducer,
    customer: customerReducer
});