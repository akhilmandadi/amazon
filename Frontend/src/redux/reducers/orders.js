import {
    FETCH_CUSTOMER_ORDERS,
    FETCH_ORDER_DETAILS
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    customerOrders: [],
    customerOrderDetails: {}
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
                customerOrderDetails: action.payload
            };
        default:
            return state;
    }
};
