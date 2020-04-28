import {
    CUSTOMER_PROFILEPIC, CUSTOMER_COVERPIC, FETCH_CUSTOMER_PROFILE, UPDATE_CUSTOMER_INFO,
    FETCH_CUSTOMER_RATING, ADD_ADDRESS, GET_ADDRESSES, REMOVE_ADDRESS, EDIT_ADDRESS, GET_CARDS, ADD_CARD
} from "./types";
import axios from "axios";

export const uploadCustomerProfilepic = (formData, config) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/customer/profilepic`, formData, config)
        .then(response => {
            dispatch({ type: CUSTOMER_PROFILEPIC, payload: response.data })
            dispatch(fetchCustomerProfile(sessionStorage.getItem('id')))
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_PROFILEPIC,
                    payload: {}
                });
            }
        });
}
export const uploadCustomerCoverpic = (formData, config) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/customer/coverpic`, formData, config)
        .then(response => {
            dispatch({ type: CUSTOMER_COVERPIC, payload: response.data })
            dispatch(fetchCustomerProfile(sessionStorage.getItem('id')))
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_COVERPIC,
                    payload: {}
                });
            }
        });
}
export const fetchCustomerProfile = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/customer/` + id)
        .then(response => {
            console.log(response.data); dispatch({
                type: FETCH_CUSTOMER_PROFILE,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FETCH_CUSTOMER_PROFILE,
                    payload: {}
                });
            }
        });
}
export const updateCustomerInfo = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/customerInfoUpdate`, data)
        .then(response => {
            dispatch({ type: UPDATE_CUSTOMER_INFO, payload: response.data })

        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: UPDATE_CUSTOMER_INFO,
                    payload: {}
                });
            }
        });
}
export const fetchCustomerRatings = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/customerRatings/` + id)
        .then(response => {
            console.log(response.data); dispatch({
                type: FETCH_CUSTOMER_RATING,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FETCH_CUSTOMER_RATING,
                    payload: {}
                });
            }
        });
}

export const addAddress = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/addresses`, data)
        .then(response => {
            console.log(response.data); dispatch({
                type: ADD_ADDRESS
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_ADDRESS
                });
            }
        });
}

export const addCard = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/cards`, data)
        .then(response => {
            console.log(response.data); dispatch({
                type: ADD_CARD,
                payload: response.data

            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_CARD,
                    payload: {}

                });
            }
        });
}

export const editAddress = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/profile/addresses/edit`, data)
        .then(response => {
            console.log(response.data); dispatch({
                type: EDIT_ADDRESS
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: EDIT_ADDRESS
                });
            }
        });
}

export const getAddresses = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/addresses/${id}`)
        .then(response => {
            console.log(response.data); dispatch({
                type: GET_ADDRESSES,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: GET_ADDRESSES,
                    payload: {}
                });
            }
        });
}

export const getCards = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/cards/${id}`)
        .then(response => {
            console.log(response.data); dispatch({
                type: GET_CARDS,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: GET_CARDS,
                    payload: {}
                });
            }
        });
}

export const removeAddress = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/profile/addresses`, data)
        .then(response => {
            console.log(response.data); dispatch({
                type: REMOVE_ADDRESS,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: REMOVE_ADDRESS
                });
            }
        });
}


