import { styled } from "styled-components";

const BaseButton = styled.button({
    borderRadius: '50px',
    padding: '8px 25px',
    whiteSpace: 'nowrap',
    transition: '0.3s',
    fontSize: '16px',
    display: 'inline-block',
    border: 'none',
    fontWeight: '600'
});

export const PrimaryButton = styled(BaseButton)({
    background: props => props.disabled ? '#dddddd' : 'lightgray',
    color: '#000',
    '&:hover': {
        background: 'black',
        color: '#fff',
    },

})
export const SecondaryButton = styled(BaseButton)({
    background: 'orange',
    color: '#fff',
    '&:hover': {
        background: 'black',
        color: '#fff',
    },
})
export const OutlinedButton = styled(BaseButton)({
    background: 'none',
    color: '#FF6337',
    border: '1px solid #FF6337',
    '&:hover': {
        background: '#FF6337',
        color: '#fff',
    },
})