import {
    CUSTOMER_PROFILEPIC, CUSTOMER_COVERPIC, FETCH_CUSTOMER_PROFILE, UPDATE_CUSTOMER_INFO,
    FETCH_CUSTOMER_RATING, ADD_ADDRESS, GET_ADDRESSES, REMOVE_ADDRESS, EDIT_ADDRESS, GET_CARDS, ADD_CARD,
    DELETE_CARD, EDIT_CARD
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {

    customerProfile: {},
    customerRating: [],
    addressRedirect: false,
    customerAddresses: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_PROFILEPIC:
            return {
                ...state,
                customerProfile: action.payload
            };

        case CUSTOMER_COVERPIC:
            return {
                ...state,
                customerProfile: action.payload
            };
        case FETCH_CUSTOMER_PROFILE:
            return {
                ...state,
                customerProfile: action.payload
            };
        case UPDATE_CUSTOMER_INFO:
            return {
                ...state,
                customerProfile: action.payload
            };
        case FETCH_CUSTOMER_RATING:
            return {
                ...state,
                customerRating: action.payload
            };
        case ADD_ADDRESS:
            return {
                addressRedirect: true
            };
        case GET_ADDRESSES:
            return {
                addressRedirect: false,
                customerAddresses: action.payload.addresses
            };
        case GET_CARDS:
            return {
                customerCards: action.payload.cards
            };
        case ADD_CARD:
            return {
                customerCards: action.payload.cards
            };
        case REMOVE_ADDRESS:
            return {
                customerAddresses: action.payload.addresses
            };
        case EDIT_ADDRESS:
            return {
                addressRedirect: true
            };
        case DELETE_CARD:
            return {
                customerCards: action.payload.cards
            };
        case EDIT_CARD:
            return {
                customerCards: action.payload.cards
            };
        default:
            return state;
    }
};
