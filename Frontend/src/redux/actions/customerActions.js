import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA
}from "./types";
import axios from "axios";

export function clearProducts(data){
    return { type: CUSTOMER_DATA };
}

export const getProductCatalog = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    console.log("getProductCatalog")
    console.log(data.searchText)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}&sortType=${data.sortType}`)
        .then(response => {console.log(response.data);dispatch({
            type: PRODUCT_CATALOG,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });
}

export const fetchProducts = (data) => dispatch => {
    console.log("fetchProductsbysearch")
    console.log(data)
    dispatch({
        type: PRODUCT_SEARCH_INPUT,
        payload: data,
    })

    dispatch(getProductCatalog(data))
}