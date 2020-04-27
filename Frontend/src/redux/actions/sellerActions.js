import {
    SAVE_SELLER_PROFILE, SET_CATEGORY_LIST,SELLER_PROFILE,ADD_NEW_PRODUCT, ADD_NEW_PRODUCT_FAILURE,EDIT_PRODUCT, SHOW_ADD_PRODUCT, SELLER_PRODUCT_CATALOG, SHOW_EDIT_PRODUCT
} from "./types";
import axios from "axios";

export const getSellerProductCatalog = (data) => dispatch => {

    let id = sessionStorage.getItem('id') ;
    if(data.id)
    {
        id = data.id
    }
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/seller/${id}/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}`)
        .then(response => {
            dispatch({
                type: SELLER_PRODUCT_CATALOG,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SELLER_PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });
}

export const saveSellerAddress = (data) => dispatch =>{
    axios.defaults.withCredentials = true;
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/seller/profile`, data)
    .then(response => {
            dispatch({
                type: SAVE_SELLER_PROFILE,
                payload: response.data
            })
        
    }
    )
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: ADD_NEW_PRODUCT_FAILURE
            });
        }
    });

}

export const getSellerProfileDetails = (data) => dispatch =>{
    axios.defaults.withCredentials = true;
    let id = sessionStorage.getItem('id');
    if(data)
    {
        id  = data ;
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/seller/${id}/profile`)
        .then(response => {
            dispatch({
                type: SAVE_SELLER_PROFILE,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SELLER_PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });

}

export const saveSellerProfilePic = (data) => dispatch =>{
    axios.defaults.withCredentials = true;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/seller/profilePic`, data,config)
    .then(response => {
            dispatch({
                type: SAVE_SELLER_PROFILE,
                payload: response.data
            })
        
    }
    )
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: ADD_NEW_PRODUCT_FAILURE
            });
        }
    });

}




export const addNewProduct = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let id = data.get("id")
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/seller/product`, data, config)
        .then(response => {
            if (!data.get("id")) {
                dispatch({
                    type: ADD_NEW_PRODUCT,
                    payload: response.data
                })
            }
            else {
                let payload
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: response.data
                })
            }
        }
        )
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_NEW_PRODUCT_FAILURE
                });
            }
        });
}

export const getCategoryList = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allCategories`)
        .then(response => {
            dispatch({
                type: SET_CATEGORY_LIST,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SET_CATEGORY_LIST,
                    payload: []
                });
            }
        });
}
export const showAddProduct = (data) => {
    return {
        type: SHOW_ADD_PRODUCT,
        payload: data
    };
}

export const showEditProduct = (data) => {
    return {
        type: SHOW_EDIT_PRODUCT,
        payload: data
    };
}