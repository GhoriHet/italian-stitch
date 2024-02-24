import { AUTH_ERROR, FORGOT_REQUEST, FORGOT_RESPONSE, LOGGED_IN, LOGGED_OUT, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_RESPONSE } from "../Actiontype"

export const signupRequest = (data) => (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST, payload: data })
}

export const signupResponse = (data) => (dispatch) => {
    dispatch({ type: SIGNUP_RESPONSE, payload: data })
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: data })
}

export const loggedIn = (data) => (dispatch) => {
    dispatch({ type: LOGGED_IN, payload: data })
}

export const forgotPassRequest = (data) => (dispatch) => {
    dispatch({ type: FORGOT_REQUEST, payload: data })
}

export const forgotPassResponse = () => (dispatch) => {
    dispatch({ type: FORGOT_RESPONSE })
}

export const logoutRequest = () => (dispatch) => {
    dispatch({type: LOGOUT_REQUEST})
}

export const loggedOut = () => (dispatch) => {
    dispatch({type: LOGGED_OUT})
}

export const authError = (data) => (dispatch) => {
    dispatch({ type: AUTH_ERROR, payload: data })
}