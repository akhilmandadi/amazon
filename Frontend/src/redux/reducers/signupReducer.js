import {
    SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER,
    CLOSE_SIGNUP_MODAL
}
    from "../actions/types";
const jwt_decode = require('jwt-decode');
const _ = require('lodash');

const initialState = {
    user: {},
    invalidCredentials: false,
    signUpSuccessful: false,
    signupFailedError: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                signUpSuccessful: true,
                signupFailedError: false
            };
        case LOGOUT_USER:
            sessionStorage.removeItem("persona");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("token");
            return Object.assign({}, state, {
                user: {
                    "name": "",
                    "id": "",
                    "email": "",
                    "persona": "",
                    "token": ""
                },
                invalidCredentials: false
            })
        case LOGIN_SUCCESS:
            var decoded = jwt_decode(action.payload.token.split(' ')[1]);
            sessionStorage.setItem("persona", decoded.persona);
            sessionStorage.setItem("email", decoded.email);
            sessionStorage.setItem("id", decoded._id);
            sessionStorage.setItem("name", decoded.name);
            sessionStorage.setItem("image", decoded.image);
            sessionStorage.setItem("token", action.payload.token);
            return Object.assign({}, state, {
                user: action.payload,
                invalidCredentials: false
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                user: {},
                invalidCredentials: true
            });
        case SIGNUP_FAILURE:
            return Object.assign({}, state, {
                signUpSuccessful: false,
                signupFailedError: true
            });
        case CLOSE_SIGNUP_MODAL:
            return Object.assign({}, state, {
                signUpSuccessful: false
            });
        default:
            return state;
    }
};
