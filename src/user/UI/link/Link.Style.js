import { styled } from "styled-components";

export const BaseLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #2c4964;
    white-space: nowrap;
    transition: 0.3s;
    border-bottom: 2px solid #fff;
    padding: 5px 2px;
    &:hover {
        color: #FF6337;
        border-color: #FF6337;
    }
`