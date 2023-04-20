import * as constants from '../../types/constActionsDetail'

const initialState = {
    newUserCreate: [],
    threeCategories : []
}

export default function newsDetailReduce(state = initialState, action) {
    switch (action.type) {
        case constants.INSCRIPTION_NEWSLETTER:
          return {
            ...state,
            newUserCreate: action.payload
          }
        case constants.THREE_CATEGORIES:
          return {
            ...state,
            threeCategories: action.payload
          }
    
        default:
            return state
    }
}