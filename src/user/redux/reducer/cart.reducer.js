import * as ActionType from '../Actiontype'

const initSate = {
    items: [],
    loading: false,
    error: null
}

export const cartReducer = (state = initSate, action) => {
    switch (action.type) {
        case ActionType.Add_TO_CART:
            let hasItmesForCart = state.items.some((val) => val.pid === action.payload.pid);
            if (hasItmesForCart) {
                let index = state.items.findIndex((val) => val.pid === action.payload.pid);
                state.items[index].quantity++;
            } else {
                state.items.push(action.payload);
            }
            return {
                ...state,
                items: state.items
            }
        case ActionType.INCREMENT_QUANTITY:
            let hasItmesForInc = state.items.find((val) => val.pid === action.payload);
            if (hasItmesForInc) {
                hasItmesForInc.quantity++
            }
            return {
                ...state,
                items: state.items
            }
        case ActionType.DECREMENT_QUANTITY:
            let hasItmesForDec = state.items.find((val) => val.pid === action.payload);
            if (hasItmesForDec) {
                if (hasItmesForDec.quantity > 1) {
                    hasItmesForDec.quantity--
                }
            }
            return {
                ...state,
                items: state.items
            }
        case ActionType.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((val) => val.pid !== action.payload)
            }
        default:
            return state
    }
}