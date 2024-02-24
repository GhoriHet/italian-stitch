import * as ActionType from '../Actiontype'

const initSate = {
    favItmes: [],
    loading: false,
    error: null
}

export const favouriteReducer = (state = initSate, action) => {
    switch (action.type) {
        case ActionType.ADD_TO_FAVOURITE:
            return {
                ...state,
                favItmes: state.favItmes.concat([{fid: action.payload}])
            }
        case ActionType.REMOVE_TO_FAVOURITE:
            return {
                ...state,
                favItmes: state.favItmes.filter((item) => item.fid !== action.payload)
            };
        default:
            return state
    }
}