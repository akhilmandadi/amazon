import {
    FETCH_CUSTOMER_ORDERS, LOADING,
    FETCH_ORDER_DETAILS, FETCH_SELLER_ORDERS,
    FETCH_ADMIN_ORDERS, SNACKBAR
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
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Updating the Order" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/orders/' + payload.orderId + '/product/' + payload.productId
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.put(url, payload)
        .then(response => {
            let text = "Order Status Updated";
            if (sessionStorage.getItem("persona") === "customer") text = "Order Cancelled Successfully"
            dispatch({ type: SNACKBAR, payload: { "snackbar": true, "text": text } })
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

export const fetchAdminOrders = (status, search) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching All Orders" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/admin/orders?status=' + status + '&search=' + search
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(url)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_ADMIN_ORDERS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_ADMIN_ORDERS, payload: [] });
        });
}

export const updateAdminOrderStatus = (payload, status, search) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Updating the Order" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/orders/' + payload.orderId + '/product/' + payload.productId
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.put(url, payload)
        .then(response => {
            dispatch({ type: SNACKBAR, payload: { "snackbar": true, "text": "Order Status Updated" } })
            dispatch(fetchAdminOrders("All", ""))
        })
        .catch(error => {
            dispatch({ type: SNACKBAR, payload: { "snackbar": true, "text": "Order Status Updation Failed" } })
            dispatch(fetchAdminOrders("All", ""))
        });
}