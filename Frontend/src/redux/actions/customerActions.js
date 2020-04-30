import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA,PRODUCT_DETAILS,
    LOADING, POST_REVIEW,PRODUCT_REVIEWS
}from "./types";
import axios from "axios";

export function clearProducts(data) {
    return { type: CUSTOMER_DATA };
}

export const getProductCatalog = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}&sortType=${data.sortType}`)
        .then(response => {dispatch({
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
    dispatch({
        type: PRODUCT_SEARCH_INPUT,
        payload: data,
    })

    dispatch(getProductCatalog(data))
}

export const postReview = (data) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Posting Review" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/product/' + data.product_id + '/review';
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(url, data)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: POST_REVIEW, payload: true })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: POST_REVIEW, payload: false });
        });
}

export const reviewPostingSuccess = () => {
    return { type: POST_REVIEW, payload: false }
}
export const getProductDetails = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/product/${data}`)
        .then(response => {console.log(response.data);dispatch({
            type: PRODUCT_DETAILS,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: PRODUCT_DETAILS,
                    payload: {}
                });
            }
        });
}

export const getProductReviews = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/productreviews/${data}`)
        .then(response => {console.log(response.data);dispatch({
            type: PRODUCT_REVIEWS,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: PRODUCT_REVIEWS,
                    payload: {}
                });
            }
        });
}