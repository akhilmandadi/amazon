import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER,FETCH_SAVEFORLATER,MOVE_TOCART
}from "./types";
import axios from "axios";

export const addSaveForLater = (id,data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/`+ id +'/saveforlater',data)
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
export const deleteSaveForLater= (id,pid) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/customer/${id}/product/${pid}/saveforlater`)
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
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/`+ id +'/saveforlater')
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/movetocart/`+id,data)
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

