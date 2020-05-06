import {
    SAVE_SELLER_PROFILE, SELLER_PROFILE, SET_CATEGORY_LIST, SHOW_ADD_PRODUCT, ADD_NEW_PRODUCT, SELLER_PRODUCT_CATALOG, SHOW_EDIT_PRODUCT, EDIT_PRODUCT
} from "../actions/types";
const _ = require('lodash');
const initialState = {
    products: [],
    editProduct: [],
    currPage: 1,
    pageCount: 1,
    searchTxt : "",
    count: 0,
    productsPerPage: 50,
    profile: {
        name: "",
        address: {
        },
        image: "",
    },
    categoryList: [],
    showAddProduct: false,
    showDelete: false,
};

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_PRODUCT_CATALOG:
            {
                let list = action.payload.products;
                let totalCOunt = action.payload.count;
                console.log("Hello");
                console.log(parseInt(action.payload.data.displayResultsOffset));
                let currPage  =       Math.floor((parseInt(action.payload.data.displayResultsOffset) + 50)/50 )//  !(parseInt(action.payload.data.displayResultsOffset)-1)?1:(parseInt(action.payload.data.displayResultsOffset)-1)/50 ;
                  let  pageCount = totalCOunt / state.productsPerPage? Math.floor((totalCOunt / state.productsPerPage) ) : 1// totalCOunt % state.productsPerPage ? Math.floor((totalCOunt / state.productsPerPage) + 1) : totalCOunt / state.productsPerPage ;
                 
                state = {
                    ...state,
                    currPage : currPage ,
                    pageCount : pageCount ,
                       products: list,
                    count: totalCOunt,
                    searchTxt : action.payload.data.searchText

                }
            }
            break;
        case SHOW_EDIT_PRODUCT:
            state = {
                ...state,
                editProduct: action.payload,
                showAddProduct: true,
            }
            break;
        case SHOW_ADD_PRODUCT:
            state = {
                ...state,
                showAddProduct: action.payload,
                editProduct: {}
            }
            break;
        case ADD_NEW_PRODUCT:
            {
                console.log(action.payload);
                let list = state.products;
                list.push(action.payload)

                console.log(state.products);
                state = {
                    ...state,
                    products: list,
                    showAddProduct: false,

                }
            }
            break;
        case SET_CATEGORY_LIST:
            state = {
                ...state,
                categoryList: action.payload
            }
            break;
        case SAVE_SELLER_PROFILE:
            let profile = {
                ...state.profile,
                name: action.payload.name,
                address: action.payload.address ? action.payload.address : "",
                image: action.payload.image,
                imageOpen: false,
                editAddress: false,
                nameEdit: false,
            }
            state = {
                ...state,
                profile: profile
            }
            break;
        case EDIT_PRODUCT:
            {

                let list = state.products;
                let product = action.payload;
                let index = _.findIndex(list, function (o) { return o._id === product._id });
                if (product.active) {
                list[index] = product;
                    state = {
                        ...state,
                        editProduct: {},
                        showAddProduct: false,
                        products: list
                    }
                }
                else {
                    list = list.slice(0, index).concat(list.slice(index + 1));
                    state = {
                        ...state,
                        editProduct: {},
                        showAddProduct: false,
                        showDelete: false,
                        products: list
                    }
                }
            }
            break;
        default:
            return state;
    }
    return state;
};



