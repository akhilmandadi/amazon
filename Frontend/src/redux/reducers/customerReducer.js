import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA, PRODUCT_DETAILS
} from "../actions/types";

const initialState = {
    products: [],
    categories: [],
    count:0,
    productSearchInput: "",
    filterCategory: "",
    displayResultsOffset: 1,
    sortType: "",
    clickedProductDetails:""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_CATALOG:
            console.log(action.payload)
            return Object.assign({}, state, {
                products: action.payload.Products,
                categories: action.payload.Categories,
                count:action.payload.Count
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
        case PRODUCT_DETAILS:
            return Object.assign({}, state, {
                clickedProductDetails:action.payload
            })
        default:
            return state;
    }
};
