import * as ActionType from '../Actiontype'

export const addOnStoreAndAPI = (fid) => (dispatch) => {
    dispatch({ type: ActionType.ADD_TO_FAVOURITE, payload: fid })
}

export const removeOnStoreAndAPI = (fid) => (dispatch) => {
    dispatch({ type: ActionType.REMOVE_TO_FAVOURITE, payload: fid })
}