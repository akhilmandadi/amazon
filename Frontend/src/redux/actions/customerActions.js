import {
    PRODUCT_CATALOG
} from "./types";
import axios from "axios";

export const getProductCatalog = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/products?searchText=${data.searchText}&filterCategory=${data.filterCategory}&displayResultsOffset=${data.displayResultsOffset}`)
        .then(response => {
            console.log(response.data); dispatch({
                type: PRODUCT_CATALOG,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: PRODUCT_CATALOG,
                    payload: {}
                });
            }
        });
}


