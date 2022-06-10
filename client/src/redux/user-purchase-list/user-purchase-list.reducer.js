import UserPurchaseListActionType from './user-purchase-list.type';

const INITIAL_STATE = {
    purchase: null,
    error: null,
    isFetching: null,
    responseData: []
}

const userPurchaseListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserPurchaseListActionType.GET_USER_PURCHASE_LIST_START:
            return {
                ...state,
                isFetching: true
            }
        case UserPurchaseListActionType.GET_USER_PURCHASE_LIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                error: false,
                items: action.payload
            }
        case UserPurchaseListActionType.GET_USER_PURCHASE_LIST_FAILURE:
            return {
                ...state,
                isFetching:false,
                error: action.payload
            }
        default:
            return state
    }
}

export default userPurchaseListReducer;