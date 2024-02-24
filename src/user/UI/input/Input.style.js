import { styled } from 'styled-components';

export const BaseInput = styled.input`
    height: 44px;
    border-radius: 0;
    box-shadow: none;
    font-size: 14px;
    padding: 10px !important;
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${({error}) => error ? '#FF0000' : '#ced4da'};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    &:focus {
        border-color: #FF6337;
        outline: none;
        color: #212529;
        background-color: #fff;
    }
`
export const Error = styled.span`
    display: ${({error}) => error ? 'inline-block' : 'none'};
    color: red;
    margin: -26px 0px 10px -325px;
    font-weight: 500;
    font-size: 14px;
    position: absolute;
`