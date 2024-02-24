import React from 'react';
import { BaseInput, Error } from './Input.style';

function Input({ errorText, ...rest }) {
    return (
        <>
            <BaseInput error={errorText} {...rest} />
            <Error error={errorText}>{errorText}</Error>
        </>
    );
}

export default Input;