import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setAlert } from "../user/redux/slice/Alert.slice"

function PrivateRoutes(props) {
    const dispatch = useDispatch();
    let isAuthenticated = useSelector(state => state.auth.user)

    if (isAuthenticated) {
        return <Outlet />
    } else {
        dispatch(setAlert({ text: 'You must be logged in to access here.', color: 'error' }))
        return <Navigate to={'/auth'} />
    }
}

export default PrivateRoutes;