import {
    SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER,
    CLOSE_SIGNUP_MODAL
}
    from "./types";
import axios from "axios";

export function logoutUser() {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    return { type: LOGOUT_USER };
}
export function closeSignupModal(payload) {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    return { type: CLOSE_SIGNUP_MODAL, payload };
}

export const signup = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, data)
        .then(response => dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SIGNUP_FAILURE
                });
            }
        });
}

export const login = (data) => dispatch => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/signin`, data)
        .then(response => dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: LOGIN_FAILURE
                });
            }
        });
}