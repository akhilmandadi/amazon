import {
    FETCH_CUSTOMER_ORDERS, LOADING,
    FETCH_ORDER_DETAILS, FETCH_SELLER_ORDERS
}
    from "./types";
import axios from "axios";

export const fetchCustomerOrders = (status) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Orders" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/customer/' + sessionStorage.getItem("id") + "/orders?status=" + status
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
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Order Details" } })
    let url = process.env.REACT_APP_BACKEND_URL + '/orders/' + id
    if (sessionStorage.getItem("persona") === "seller") url = process.env.REACT_APP_BACKEND_URL + '/seller/' + sessionStorage.getItem("id") + '/orders/' + id
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

export const updateOrderStatus = (payload, location, status) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Cancelling the Order" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/orders/' + payload.orderId + '/product/' + payload.productId
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.put(url, payload)
        .then(response => {
            dispatch(fetchOrderDetails(payload.orderId))
            if (location === "home") {
                if (sessionStorage.getItem('persona') === "customer") dispatch(fetchCustomerOrders(status))
                if (sessionStorage.getItem('persona') === "seller") dispatch(fetchSellerOrders(status))
            }
        })
        .catch(error => {
            dispatch(fetchOrderDetails(payload.orderId))
        });
}

export const fetchSellerOrders = (status) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Orders" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/seller/' + sessionStorage.getItem("id") + "/orders?status=" + status
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(url)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_SELLER_ORDERS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_SELLER_ORDERS, payload: [] });
        });
}

export const fetchSellerOrderDetails = (id) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Your Order Details" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/seller/' + sessionStorage.getItem("id") + '/orders/' + id
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