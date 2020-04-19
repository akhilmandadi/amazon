import {
    LOADING
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    loading: false,
    loadingText: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload.loading,
                loadingText: action.payload.text
            };
        default:
            return state;
    }
};
