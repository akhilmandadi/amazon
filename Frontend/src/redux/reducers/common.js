import {
    LOADING, GET_CATEGORY_LIST, NEW_CATEGORY, REMOVE_CATEGORY, SNACKBAR
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    snackbar: false,
    snackbarText: "",
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
        case SNACKBAR:
            console.log(action.payload)
            return {
                ...state,
                snackbar: action.payload.snackbar,
                snackbarText: action.payload.text
            };
        default:
            return state;
    }
    return state
};
