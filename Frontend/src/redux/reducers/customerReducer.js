import {
    PRODUCT_CATALOG
} from "../actions/types";

const initialState = {
    products : {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_CATALOG:
            console.log(action.payload)
            return Object.assign({}, state, {
                products:action.payload
            });
        default:
            return state;
    }
};
