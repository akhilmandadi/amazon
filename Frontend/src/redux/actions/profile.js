import {
    CUSTOMER_PROFILEPIC,CUSTOMER_COVERPIC,FETCH_CUSTOMER_PROFILE,UPDATE_CUSTOMER_INFO,FETCH_CUSTOMER_RATING
}from "./types";
import axios from "axios";

export const uploadCustomerProfilepic = (formData,config) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/profilepic`,formData,config)
    .then(response => {
        dispatch({type: CUSTOMER_PROFILEPIC,payload: response.data })
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
export const uploadCustomerCoverpic = (formData,config) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/coverpic`,formData,config)
        .then(response => {
            dispatch({type: CUSTOMER_COVERPIC,payload: response.data })
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
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/customer/`+ id)
        .then(response => {console.log(response.data);dispatch({
            type: FETCH_CUSTOMER_PROFILE,
            payload: response.data
        })})
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/customerInfoUpdate`,data)
        .then(response => {
            dispatch({type: UPDATE_CUSTOMER_INFO,payload: response.data })
            
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
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/customerRatings/`+ id)
        .then(response => {console.log(response.data);dispatch({
            type: FETCH_CUSTOMER_RATING,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FETCH_CUSTOMER_RATING,
                    payload: {}
                });
            }
        });
}


