import {
    FETCH_CUSTOMER_ORDERS, LOADING,
    FETCH_ORDER_DETAILS
}
    from "./types";
import axios from "axios";

export const fetchCustomerOrders = () => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Orders" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/customer/' + sessionStorage.getItem("id") + "/orders"
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(url)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_CUSTOMER_ORDERS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_CUSTOMER_ORDERS, payload: [] });
        });
}

export const fetchOrderDetails = (id) => dispatch => {
    console.log("ininini")
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Order Details" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/orders/' + id
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(url)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_ORDER_DETAILS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_ORDER_DETAILS, payload: {} });
        });
}