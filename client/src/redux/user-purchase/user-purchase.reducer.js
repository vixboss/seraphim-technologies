import UserPurchaseActionType from './user-purchase.type';

const INITIAL_STATE = {
    purchase: null,
    error: null,
    isFetching: null,
    responseData: []
}

const userPurchaseReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserPurchaseActionType.SEARCH_USER_PURCHASE_START:
        case UserPurchaseActionType.GET_USER_PURCHASE_START:
            return {
                ...state,
                isFetching: true
            }
        case UserPurchaseActionType.SEARCH_USER_PURCHASE_SUCCESS:
        case UserPurchaseActionType.GET_USER_PURCHASE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                userPurchase: action.payload
            }
        case UserPurchaseActionType.ADD_USER_PURCHASE_FAILURE:
        case UserPurchaseActionType.GET_USER_PURCHASE_FAILURE: 
            return {
                ...state,
                isFetching:false,
                error: action.payload
            }
        default:
            return state
    }
}

export default userPurchaseReducer;