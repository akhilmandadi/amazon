import {
    FETCH_SELLER_PROFILES, REMOVE_CATEGORY, ADMIN_PRODUCT_CATALOG, ADD_CATEGORY, CHANGE_CATEGORY, SET_CATEGORY_LSIT
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {
    sellerDetails: [],
    allProductCatlog: {
        Products: []
    },
    categoryList: [],
    adminProductCatlog: {
        Products: []
    },
    productsList : [] ,
    currPage: 1,
    pageCount: 1,
    count: 0,
    productsPerPage: 50,
    currentCategory: {
        _id: 0,
        name: "All"
    },

};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SELLER_PROFILES:
            return {
                ...state,
                sellerDetails: action.payload
            };
        case ADMIN_PRODUCT_CATALOG:
            {
                let totalCOunt = action.payload.count;
                let currPage = Math.floor((parseInt(action.payload.offSett) +50 )/50 );
                 let pageCount = totalCOunt % state.productsPerPage ? Math.floor((totalCOunt / state.productsPerPage) + 1) : totalCOunt / state.productsPerPage;
                //  let currPage  =  !(parseInt(action.payload.data.displayResultsOffset)-1)?1:(parseInt(action.payload.data.displayResultsOffset)-1)/50 ;
                //  let  pageCount = totalCOunt / state.productsPerPage? Math.floor((totalCOunt / state.productsPerPage) ) : 1// totalCOunt % state.productsPerPage ? Math.floor((totalCOunt / state.productsPerPage) + 1) : totalCOunt / state.productsPerPage ;
                
                if (action.payload.category.name === "All") {
                    state = {
                        ...state,
                        allProductCatlog: action.payload,

                    }
                }
                state = {
                    ...state,
                    adminProductCatlog: action.payload,
                    productsList : action.payload.productsList ,
                    currentCategory: action.payload.category,
                    currPage: currPage,
                    pageCount: pageCount,
                    count: action.payload.count
                }
            }
            break;

        case SET_CATEGORY_LSIT:
            state = {
                ...state,
                categoryList: action.payload
            }
            break;
        case ADD_CATEGORY:
            {
                let list = state.categoryList;
                list.push(action.payload)


                state = {
                    ...state,
                    currentCategory: action.payload,
                    categoryList: list,
                    productsList : [],
                    currPage: 1,
                    pageCount: 1,
                    count: 0,
                    productsPerPage: 50,
                    adminProductCatlog: {
                        Products: []
                    }
                }
            }
            break;
        case REMOVE_CATEGORY:
            {
                let list = state.categoryList;
                let catName = action.payload.name
                let index = _.findIndex(list, function (o) { return o.name === catName });

                list = list.slice(0, index).concat(list.slice(index + 1));

              
                let totalCOunt = state.allProductCatlog.count;
                let currPage = (parseInt(state.allProductCatlog.offSett) +50 )/50 ;
                let pageCount = totalCOunt % state.productsPerPage ? Math.floor((totalCOunt / state.productsPerPage) + 1) : totalCOunt / state.productsPerPage;

                // if (action.payload.category.name === "All") {
                //     state = {
                //         ...state,
                //         allProductCatlog: action.payload.productsList,

                //     }
                // }
                state = {
                    ...state,
                    productsList : state.allProductCatlog.productsList,
                    categoryList: list,
                    currentCategory: {
                        _id: 0,
                        name: "All"
                    },
                    currPage: currPage,
                    pageCount: pageCount,
                    count: action.payload.count
                }

            }
            break;
        default:
            return state;
    }
    return state;
};
