import {
    PRODUCT_CATALOG, PRODUCT_SEARCH_INPUT, CUSTOMER_DATA,PRODUCT_DETAILS,
    LOADING, POST_REVIEW,PRODUCT_REVIEWS
}from "./types";
import axios from "axios";

export function clearProducts(data) {
    return { type: CUSTOMER_DATA };
}

export const getProductCatalog = (data) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Please wait while we fetch products for you:)" } })
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}&sortType=${data.sortType}&rating=${data.rating}&priceFilter=${data.priceFilter}`)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({type: PRODUCT_CATALOG,payload: response.data})})
        .catch(error => {
            if (error.response && error.response.data) {
                dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
                dispatch({type: PRODUCT_CATALOG,payload: []});
            }
        });
}

export const fetchProducts = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    return { type: POST_REVIEW, payload: false }
}
export const getProductDetails = (id,persona) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/product/${id}?persona=${persona}`)
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
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