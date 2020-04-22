import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER,FETCH_SAVEFORLATER,MOVE_TOCART
}from "./types";
import axios from "axios";

export const addSaveForLater = (id,data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/saveforlater/`+id,data)
    .then(response => {
        dispatch({type: ADD_SAVEFORLATER,payload: response.data })
    })
        
    .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const deleteSaveForLater= (id,data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(data)

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/saveforlater/delete/`+id,data)
        .then(response => {
            
            dispatch({type: DELETE_SAVEFORLATER,payload: response.data })
           
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: DELETE_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const fetchSaveForLater = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(process.env.REACT_APP_BACKEND_URL)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/saveforlater/`+ id)
        .then(response => {console.log(response.data);dispatch({
            type:FETCH_SAVEFORLATER,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FETCH_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const moveToCart= (id,data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(data)

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/movetocart/`+id,data)
        .then(response => {
            
            dispatch({type:MOVE_TOCART,payload: response.data })
           
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: MOVE_TOCART,
                    payload: {}
                });
            }
        });
}

