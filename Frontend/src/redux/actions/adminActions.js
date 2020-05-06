import {
    FETCH_SELLER_PROFILES, ADMIN_PRODUCT_CATALOG, ADD_CATEGORY, SET_CATEGORY_LSIT,
    LOADING, GET_CATEGORY_LIST, NEW_CATEGORY, CHANGE_CATEGORY, REMOVE_CATEGORY
}
    from "./types";
import axios from "axios";

export const fetchSellerProfiles = (search) => dispatch => {
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching Seller Profiles" } })
    const url = process.env.REACT_APP_BACKEND_URL + '/sellers?search=' + search
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.get(url)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_SELLER_PROFILES, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
            dispatch({ type: FETCH_SELLER_PROFILES, payload: [] });
        });
}

export const getAdminProductCatalog = (data) => dispatch => {
    let fc = {
        ...data.filterCategory,
    }
    if (data.filterCategory.name === "All") {
        fc = {
            ...fc,
            name: ""
        }
    }
    dispatch({ type: LOADING, payload: { "loading": true, "text": "Fetching All Products" } })
    
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/products?searchText=${data.searchText}&filterCategory=${fc.name}&displayResultsOffset=${data.displayResultsOffset}`)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": "" } })
    
            let rdata = {
                ...response.data,
                data: data
            }
            dispatch({
                type: ADMIN_PRODUCT_CATALOG,
                payload: {
                    productsList: response.data.Products,
                    count : response.data.count ,
                    category: data.filterCategory,
                    offSett: data.displayResultsOffset
                }
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADMIN_PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });
}

export const addCategory = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    dispatch({ type: LOADING, payload: { "loading": true, "text": " Saving Category" } })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/category`, data)
        .then(response => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": " " } })
            dispatch({
                type: ADD_CATEGORY,
                payload: response.data
            })
            dispatch({
                type: NEW_CATEGORY,
                payload: response.data
            })

        })
        .catch(error => {
            dispatch({ type: LOADING, payload: { "loading": false, "text": " " } })
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_CATEGORY,
                    payload: error.response
                });
            }
        });
}
export const removeCategory = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/${data._id}`)
        .then(response => {

            dispatch({
                type: REMOVE_CATEGORY,
                payload: data
            })

        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_CATEGORY,
                    payload: error.response
                });
            }
        });
}
export const getCategoryList = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allCategories`)
        .then(response => {
            dispatch({
                type: SET_CATEGORY_LSIT,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: SET_CATEGORY_LSIT,
                    payload: []
                });
            }
        });
}


