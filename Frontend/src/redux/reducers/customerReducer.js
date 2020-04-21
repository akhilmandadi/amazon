import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA
} from "../actions/types";

const initialState = {
    products: {},
    categories: {},
    productSearchInput: "",
    filterCategory: "",
    displayResultsOffset: 1,
    sortType: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_CATALOG:
            console.log(action.payload)
            return Object.assign({}, state, {
                products: action.payload.Products,
                categories: action.payload.Categories
            });
        case PRODUCT_SEARCH_INPUT:
            return Object.assign({}, state, {
                productSearchInput: action.payload.searchText,
                filterCategory: action.payload.filterCategory,
                displayResultsOffset: action.payload.displayResultsOffset,
                sortType: action.payload.sortType
            });
        case CUSTOMER_DATA:
            return Object.assign({}, state, {
                products: {},
                productSearchInput: "",
                filterCategory: "",
                displayResultsOffset: "",
                sortType: ""
            })
        default:
            return state;
    }
};
