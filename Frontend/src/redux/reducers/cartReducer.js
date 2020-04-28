import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER, FETCH_SAVEFORLATER, MOVE_TOCART,
    CUSTOMER_CART,ADD_TO_CART_PRODUCT_DETAIL_PAGE
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {

    saveforlater: [],
    cartlist: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload,
                redirectToSaveForLater:true
            };

        case DELETE_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload
            };
        case FETCH_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload,
                redirectToSaveForLater:false
            };
        case MOVE_TOCART:
            return {
                ...state,
                cartlist: action.payload
            };
        case ADD_TO_CART_PRODUCT_DETAIL_PAGE:
            return {
                cartRedirect:true
            };
        case CUSTOMER_CART:
            return Object.assign({}, state, {
                cartRedirect:false,
                cartlist: action.payload
            });
        default:
            return state;
    }
};
