import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER, FETCH_SAVEFORLATER,
    MOVE_TOCART, CUSTOMER_CART, CUSTOMER_CHECKOUT_DETAILS,
    CUSTOMER_CHECKOUT_SUBTOTAL, CUSTOMER_ORDER_SUMMARY
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {

    saveforlater: [],
    cartlist: [],
    cartsubtotal: 0,
    carttotalitems: 0,
    checkoutdetails: {},
    checkoutsubtotal: 0,
    checkouttotalitems: 0,
    ordersummary:0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload
            };

        case DELETE_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload
            };
        case FETCH_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload
            };
        case MOVE_TOCART:
            return {
                ...state,
                cartlist: action.payload
            };
        case CUSTOMER_CART:
            return Object.assign({}, state, {
                cartlist: action.payload,
                cartsubtotal: _.sumBy(action.payload, function (item) { if (item.gift) { return ((item.product.discountedPrice + 10) * item.quantity) } else { return (item.product.discountedPrice * item.quantity) } }),
                carttotalitems: _.sumBy(action.payload, 'quantity')
            });
        case CUSTOMER_CHECKOUT_DETAILS:
            return Object.assign({}, state, {
                checkoutdetails: action.payload
            });
        case CUSTOMER_CHECKOUT_SUBTOTAL:
            return Object.assign({}, state, {
                checkoutsubtotal: action.payload[0],
                checkouttotalitems: action.payload[1]
            });
        case CUSTOMER_ORDER_SUMMARY:
            return Object.assign({}, state, {
                ordersummary: action.payload,
            });
        default:
            return state;
    }
};
