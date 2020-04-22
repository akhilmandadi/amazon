import {
    SAVE_SELLER_PROFILE, SELLER_PROFILE, SHOW_ADD_PRODUCT, ADD_NEW_PRODUCT, SELLER_PRODUCT_CATALOG, SHOW_EDIT_PRODUCT, EDIT_PRODUCT
} from "../actions/types";
const _ = require('lodash');
const initialState = {
    products: {},
    editProduct: {},
    profile : {
        name : "",
        address : {
        },
        image : "",
    },
    showAddProduct: false,
    showDelete : false,
};

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_PRODUCT_CATALOG: console.log(action.payload)
            return Object.assign({}, state, {
                products: action.payload
            });

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
        case SAVE_SELLER_PROFILE:
            let profile = {
                ...state.profile,
                name : action.payload.name,
                address : action.payload.address?action.payload.address:"",
                image : action.payload.image,
                imageOpen : false,
                editAddress : false ,
                nameEdit : false,
            }
            state = {
                ...state,
                profile : profile 
            }
            break;
        case EDIT_PRODUCT:
            {
                
                let list = state.products;
                let product = action.payload;
                let index = _.findIndex(list, function (o) { return o._id === product._id });
                if(product.active)
                {list[index] = product;
                state = {
                    ...state,
                    editProduct: {},
                    showAddProduct: false,
                    products: list
                }}
                else
                {
                    list = list.slice(0, index).concat(list.slice(index + 1));
                    state = {
                        ...state,
                        editProduct: {},
                        showAddProduct: false,
                        showDelete : false,
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



