import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER,FETCH_SAVEFORLATER,MOVE_TOCART,
    CUSTOMER_CART
  }
  from "../actions/types";
  const _ = require('lodash');
  
  const initialState = {
    
      saveforlater:[],
      cartlist:[],
  };
  
  export default function (state = initialState, action) {
      switch (action.type) {
          case  ADD_SAVEFORLATER:
              return {
                  ...state,
                  saveforlater : action.payload
              };
              
          case DELETE_SAVEFORLATER:
              return {
                  ...state,
                  saveforlater : action.payload
              };
          case FETCH_SAVEFORLATER:
                  return {
                      ...state,
                   saveforlater : action.payload
                  };
        case MOVE_TOCART:
                return {
                        ...state,
                     cartlist : action.payload
                    };
        case CUSTOMER_CART:
            return Object.assign({}, state, {
                    cartlist: action.payload
            });
          default:
              return state;
      }
  };
  