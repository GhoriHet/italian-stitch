import * as ActionType from '../Actiontype'

export const addToCart = (id) => (dispatch) => {
    dispatch({ type: ActionType.Add_TO_CART, payload: { pid: id, quantity: 1 } })
}

export const decrementQuantity = (id) => (dispatch) => {
    dispatch({ type: ActionType.DECREMENT_QUANTITY, payload: id })
}

export const incrementQuantity = (id) => (dispatch) => {
    dispatch({ type: ActionType.INCREMENT_QUANTITY, payload: id })
}

export const removeItemFromCart = (id) => (dispatch) => {
    dispatch({ type: ActionType.REMOVE_ITEM, payload: id })
}