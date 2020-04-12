import { USER_SIGNUP,USER_LOGIN} from "./types";

import {rooturl} from '../webConfig';

import axios from "axios";




export const signup = (data) => dispatch => {
    console.log(data)
    axios.defaults.withCredentials = true;
   // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${rooturl}/signup`, data)
        .then(response => dispatch({
            type:USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
        });
}

export const login = (data) => dispatch => {
    console.log(data)
    axios.defaults.withCredentials = true;
   // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${rooturl}/signup/login`, data)
        .then(response => dispatch({
            type:USER_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: error.response.data
                });
            }
        });
}



