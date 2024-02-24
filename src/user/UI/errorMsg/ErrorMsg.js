import React from 'react';
import { styled } from 'styled-components';
import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const ErrorWrapper = styled.div``
const ErrorText = styled.h1`
    color: #cccccc
`

function ErrorMsg({ text, ...rest }) {
    return (
        <ErrorWrapper {...rest} className='d-flex gap-2 align-items-center justify-content-center'>
            <SadIcon style={{ fontSize: '45px', verticalAlign: 'sub', color: '#cccccc' }} />
            <ErrorText className='m-0'>{text}</ErrorText>
        </ErrorWrapper>
    );
}

export default ErrorMsg;