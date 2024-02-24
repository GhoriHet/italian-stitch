import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetAlert } from '../redux/slice/Alert.slice';

function Alert(props) {

    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch();

    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text, {
                autoHideDuration: 2000,
                variant: alert.color,
                anchorOrigin: {
                    vertical: 'right',
                    horizontal: 'bottom'
                }
            })
        }

        const timer = setTimeout(() => {
            dispatch(resetAlert());
        }, 2000)

        return () => clearTimeout(timer)
    }, [alert.text])

    return (
        <div></div>
    );
}

export default Alert;