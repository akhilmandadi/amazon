import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA, PRODUCT_DETAILS,
    POST_REVIEW, PRODUCT_REVIEWS
} from "../actions/types";

const initialState = {
    products: [],
    categories: [],
    count: 0,
    productSearchInput: "",
    filterCategory: "",
    displayResultsOffset: 1,
    sortType: "",
    reviewPosted: false,
    clickedProductDetails: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_CATALOG:
            return Object.assign({}, state, {
                products: action.payload.Products,
                categories: action.payload.Categories,
                count: action.payload.Count
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
        case POST_REVIEW:
            console.log(action.payload)
            return {
                ...state,
                reviewPosted: action.payload
            };
        case PRODUCT_DETAILS:
            return Object.assign({}, state, {
                clickedProductDetails: action.payload
            })
        case PRODUCT_REVIEWS:
            return Object.assign({}, state, {
                clickedProductReviews: action.payload
            })
        default:
            return state;
    }
};
