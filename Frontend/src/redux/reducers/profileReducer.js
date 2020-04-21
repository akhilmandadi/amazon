import {
  CUSTOMER_PROFILEPIC,
   CUSTOMER_COVERPIC, FETCH_CUSTOMER_PROFILE,UPDATE_CUSTOMER_INFO,FETCH_CUSTOMER_RATING
}
from "../actions/types";
const _ = require('lodash');

const initialState = {
  
    customerProfile:{},
    customerRating:[],
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_PROFILEPIC:
            return {
                ...state,
                customerProfile : action.payload
            };
            
        case CUSTOMER_COVERPIC:
            return {
                ...state,
                customerProfile : action.payload
            };
        case FETCH_CUSTOMER_PROFILE:
                return {
                    ...state,
                 customerProfile : action.payload
                };
         case UPDATE_CUSTOMER_INFO:
                return {
                    ...state,
                customerProfile : action.payload
            };
         case FETCH_CUSTOMER_RATING:
                return {
                    ...state,
                customerRating : action.payload
            };
        default:
            return state;
    }
};
