import { USER_SIGNUP, USER_LOGIN } from '../actions/types';




const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_SIGNUP:
            return {
                ...state,
                user: action.payload
            };
         case USER_LOGIN:
                return {
                    ...state,
                    user: action.payload
                };
       
        default:
            return state;
    }
};


 
 