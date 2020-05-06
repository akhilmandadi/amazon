import {
    SNACKBAR
}
    from "./types";
import axios from "axios";

export function closeSnackbar() {
    console.log("in close")
    return { type: SNACKBAR, payload: { "snackbar": false, "text": "" } };
}