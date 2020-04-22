import {
    FETCH_CUSTOMER_ORDERS,
    FETCH_ORDER_DETAILS, FETCH_SELLER_ORDERS,
    FETCH_ADMIN_ORDERS
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    customerOrders: [],
    orderDetails: {},
    sellerOrders: [],
    adminOrders: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMER_ORDERS:
            return {
                ...state,
                customerOrders: action.payload
            };
        case FETCH_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            };
        case FETCH_SELLER_ORDERS:
            return {
                ...state,
                sellerOrders: action.payload
            };
        case FETCH_ADMIN_ORDERS:
            return {
                ...state,
                adminOrders: action.payload
            };
        default:
            return state;
    }
};
