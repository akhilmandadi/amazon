import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER,FETCH_SAVEFORLATER,
  }
  from "../actions/types";
  const _ = require('lodash');
  
  const initialState = {
    
      saveforlater:[],
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
          
          default:
              return state;
      }
  };
  