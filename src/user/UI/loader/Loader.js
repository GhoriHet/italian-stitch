import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "styled-components";

function Loader({ ...rest }) {
    const LoaderWrapper = styled.div``
    return (
        <LoaderWrapper {...rest} className='d-flex align-items-center justify-content-center'>
            <CircularProgress sx={{ color: '#FF6337' }} />
        </LoaderWrapper>
    );
}

export default Loader;