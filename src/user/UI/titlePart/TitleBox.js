import React from 'react';
import { TitleWapper, Title, SubTitle, OrangeTitle } from './TitleBox.Styled';

function TitleBox({ OrangeTitleText, titleText, subTitleText, type }) {
    return (
        <TitleWapper align={type}>
            {OrangeTitleText ? <OrangeTitle>{OrangeTitleText}</OrangeTitle> : null}
            <Title align={type}>{titleText}</Title>
            {
                Array.isArray(subTitleText) && subTitleText.length > 0 && subTitleText.map((text, ind) => {
                    return (
                        <SubTitle key={ind}>{text}</SubTitle>
                    )
                })
            }
        </TitleWapper>
    );
}

export default TitleBox;