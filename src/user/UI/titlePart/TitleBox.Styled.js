import { styled } from 'styled-components';

export const TitleWapper = styled.div`
    text-align: ${({ align }) => align === 'left' ? 'left' : 'center'};
    padding-bottom: 30px;
    margin-top: 10px;
`

export const OrangeTitle = styled.span`
    display: block;
    color: #FF6337;
    font-size: 14.5px;
    margin-top: 7px;
`

export const Title = styled.h2`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    position: relative;
    color: #2c4964;
    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 120px;
        height: 1px;
        background: #ddd;
        bottom: 1px;
        left: ${({ align }) => align === 'left' ? '0' : 'calc(50% - 60px)'};
    }
    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 40px;
        height: 3px;
        background: #49D1D1;
        bottom: 0;
        left: ${({ align }) => align === 'left' ? '0' : 'calc(50% - 20px)'};
    }
`
export const SubTitle = styled.p``