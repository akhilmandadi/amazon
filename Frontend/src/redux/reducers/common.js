import {
    LOADING, GET_CATEGORY_LIST, NEW_CATEGORY , REMOVE_CATEGORY
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    loading: false,
    loadingText: "",
    categoryList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload.loading,
                loadingText: action.payload.text
            };
        case GET_CATEGORY_LIST:
            state = {
                ...state,
                categoryList: action.payload
            }
            break;
      
     
        default:
            return state;
    }
    return state
};
