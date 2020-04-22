import {
    FETCH_SELLER_PROFILES, 
    LOADING
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
