import React from 'react';
import { BaseLink } from './Link.Style';

function CustomLink({children, ...rest }) {
    return (
        <BaseLink {...rest}>{children}</BaseLink>
    );
}

export default CustomLink;