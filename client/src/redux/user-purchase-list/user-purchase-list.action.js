import UserPurchaseListActionType from './user-purchase-list.type';

export const getAllUserPurchaseListStart = () => ({
    type: UserPurchaseListActionType.GET_USER_PURCHASE_LIST_START
});

export const getAllUserPurchaseListSuccess = (userPurchase) => ({
    type: UserPurchaseListActionType.GET_USER_PURCHASE_LIST_SUCCESS,
    payload: userPurchase
});

export const getAllUserPurchaseListFailure = (error) => ({
    type: UserPurchaseListActionType.GET_USER_PURCHASE_LIST_FAILURE,
    payload: error
});