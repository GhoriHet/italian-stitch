import { all, call, put, takeEvery } from 'redux-saga/effects'
import { FORGOT_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../Actiontype'
import { forgotPassAPI, loginAPI, logoutAPI, signupAPI } from '../../../common/api/auth.api'
import { authError, forgotPassResponse, loggedIn, loggedOut, signupResponse } from '../action/auth.action'
import { setAlert } from '../slice/Alert.slice'

function* signupUser(action) {
    try {
        const user = yield call(signupAPI, action.payload)
        yield put(signupResponse(user.user))
        yield put(setAlert({ text: user.message, color: 'success' }))
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* loginUser(action) {
    try {
        const user = yield call(loginAPI, action.payload.data)
        yield put(setAlert({ text: user.message, color: 'success' }))
        yield put(loggedIn(user.user));
        action.payload.callback("/")
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* forgotUser(action) {
    try {
        const user = yield call(forgotPassAPI, action.payload)
        yield put(setAlert({ text: user.message, color: 'success' }))
        yield put(forgotPassResponse());
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}

function* logoutUser() {
    try {
        const user = yield call(logoutAPI)
        yield put(loggedOut())
        yield put(setAlert({ text: user.message, color: 'success' }))
    } catch (e) {
        yield put(setAlert({ text: e.message, color: 'error' }))
        yield put(authError(e.message))
    }
}
function* watchSignup() {
    yield takeEvery(SIGNUP_REQUEST, signupUser)
}

function* watchLogin() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

function* watchForgotPass() {
    yield takeEvery(FORGOT_REQUEST, forgotUser)
}

function* logoutSaga() {
    yield takeEvery(LOGOUT_REQUEST, logoutUser)
}

export function* authSaga() {
    yield all([
        watchSignup(),
        watchLogin(),
        watchForgotPass(),
        logoutSaga()
    ])
}