import {
    SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER,
    CLOSE_SIGNUP_MODAL
}
    from "./types";
import axios from "axios";

export function logoutUser() {
    return { type: LOGOUT_USER };
}
export function closeSignupModal(payload) {
    return { type: CLOSE_SIGNUP_MODAL, payload };
}

export const signup = (data) => dispatch => {
    axios.defaults.withCredentials = true;
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
    console.log(data)
    axios.defaults.withCredentials = true;
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