import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import common from './common'
import orders from './orders';
import analytics from './analytics'
import customerReducer from './customerReducer';
import profileReducer from './profileReducer';
import cartReducer from './cartReducer';

import {sellerReducer} from './sellerReducer';
import adminReducer from './admin';

export default combineReducers({
    signup: signupReducer,
    customer: customerReducer,
    sellerReducer : sellerReducer,
    common: common,
    orders: orders,
    profile:profileReducer,
    admin: adminReducer,
    cart:cartReducer,
    analytics:analytics
});