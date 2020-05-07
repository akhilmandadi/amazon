import {
    TOP_SOLDPRODUCTS, ORDERS_PERDAY, TOP_SELLERS, TOP_CUSTOMERS, TOP_RATEDPRODUCTS, TOP_VIEWEDPRODUCTS, SELLER_MONTHLYREPORT, SELLER_REPORT
} from "./types";
import axios from "axios";

export const fetchTopSoldProducts = () => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/topsoldproducts`)
        .then(response => {
            dispatch({
                type: TOP_SOLDPRODUCTS,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: TOP_SOLDPRODUCTS,
                    payload: {}
                });
            }
        });
}

export const fetchOrdersPerDay = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/analytics/ordersperday`,data)
        .then(response => {
            dispatch({
                type: ORDERS_PERDAY,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ORDERS_PERDAY,
                    payload: {}
                });
            }
        });
}
export const fetchTopSellers = () => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/topsellers`)
        .then(response => {
            dispatch({
                type: TOP_SELLERS,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: TOP_SELLERS,
                    payload: {}
                });
            }
        });
}
export const fetchTopCustomers = () => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/topcustomers`)
        .then(response => {
            dispatch({
                type: TOP_CUSTOMERS,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: TOP_CUSTOMERS,
                    payload: {}
                });
            }
        });
}
export const fetchTopRatedProducts = () => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/topratedproducts`)
        .then(response => {
            dispatch({
                type: TOP_RATEDPRODUCTS,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: TOP_RATEDPRODUCTS,
                    payload: {}
                });
            }
        });
}
export const fetchTopViewedProducts = () => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/topviewedproducts`)
        .then(response => {
            dispatch({
                type: TOP_VIEWEDPRODUCTS,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: TOP_VIEWEDPRODUCTS,
                    payload: {}
                });
            }
        });
}

export const fetchSellerStatictics = (id) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/analytics/sellerstatictics/`+id)
        .then(response => {
            dispatch({
                type: SELLER_REPORT,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SELLER_REPORT,
                    payload: {}
                });
            }
        });
}
export const fetchSellerMonthlyStatictics = (id,data) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/analytics/sellermonthlystatictics/`+id,data)
        .then(response => {
            dispatch({
                type: SELLER_MONTHLYREPORT,
                payload: response.data
            })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SELLER_MONTHLYREPORT,
                    payload: {}
                });
            }
        });
}
