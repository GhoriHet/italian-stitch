import { AUTH_ERROR, FORGOT_REQUEST, FORGOT_RESPONSE, LOGGED_IN, LOGGED_OUT, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_RESPONSE } from "../Actiontype"

const initState = {
    loading: false,
    error: null,
    user: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case FORGOT_REQUEST:
            return {
                user: null,
                loading: true,
                error: null
            }
        case SIGNUP_RESPONSE:
        case LOGGED_OUT:
        case FORGOT_RESPONSE:
            return {
                user: null,
                loading: false,
                error: null
            }
        case LOGGED_IN:
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case AUTH_ERROR:
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}