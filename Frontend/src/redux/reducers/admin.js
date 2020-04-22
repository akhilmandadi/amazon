import {
    FETCH_SELLER_PROFILES
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    sellerDetails: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SELLER_PROFILES:
            return {
                ...state,
                sellerDetails: action.payload
            };
        default:
            return state;
    }
};
