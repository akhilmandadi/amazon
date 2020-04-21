import {
    ADD_NEW_PRODUCT, ADD_NEW_PRODUCT_FAILURE,EDIT_PRODUCT, SHOW_ADD_PRODUCT, SELLER_PRODUCT_CATALOG, SHOW_EDIT_PRODUCT
} from "./types";
import axios from "axios";

export const getSellerProductCatalog = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/seller/${sessionStorage.getItem('id')}/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}`)
        .then(response => {
            console.log(response.data);
            dispatch({
                type: SELLER_PRODUCT_CATALOG,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SELLER_PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });
}


export const addNewProduct = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let id = data.get("id")
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/seller/product`, data, config)
        .then(response => {
            if (!data.get("id")) {
                dispatch({
                    type: ADD_NEW_PRODUCT,
                    payload: response.data
                })
            }
            else {
                let payload
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: response.data
                })
            }
        }
        )
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_NEW_PRODUCT_FAILURE
                });
            }
        });
}
export const showAddProduct = (data) => {
    return {
        type: SHOW_ADD_PRODUCT,
        payload: data
    };
}

export const showEditProduct = (data) => {
    return {
        type: SHOW_EDIT_PRODUCT,
        payload: data
    };
}