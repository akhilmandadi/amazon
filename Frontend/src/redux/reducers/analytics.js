import {
    TOP_SOLDPRODUCTS, ORDERS_PERDAY, TOP_SELLERS, TOP_CUSTOMERS, TOP_RATEDPRODUCTS, TOP_VIEWEDPRODUCTS, SELLER_MONTHLYREPORT, SELLER_REPORT
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    productlist: [],
    orderlist: [],
    sellerlist: [],
    customerlist: [],
    ratelist: [],
    viewlist: [],
    list: [],
    monthlist: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOP_SOLDPRODUCTS:
            return {
                ...state,
                productlist: action.payload
            };
        case ORDERS_PERDAY:
            return {
                ...state,
                orderlist: action.payload
            };
        case TOP_SELLERS:
            return {
                ...state,
                sellerlist: action.payload
            };
        case TOP_CUSTOMERS:
            return {
                ...state,
                customerlist: action.payload
            };
        case TOP_RATEDPRODUCTS:
            return {
                ...state,
                ratelist: action.payload
            };

        case TOP_VIEWEDPRODUCTS:
            return {
                ...state,
                viewlist: action.payload
            };
        case SELLER_MONTHLYREPORT:
            return {
                ...state,
                monthlist: action.payload
            };
        case SELLER_REPORT:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
};
