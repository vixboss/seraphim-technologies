import UserPurchaseActionType from './user-purchase.type';

export const getAllUserPurchaseStart = () => ({
    type: UserPurchaseActionType.GET_USER_PURCHASE_START
});

export const getAllUserPurchaseSuccess = (userPurchase) => ({
    type: UserPurchaseActionType.GET_USER_PURCHASE_SUCCESS,
    payload: userPurchase
});

export const getAllUserPurchaseFailure = (error) => ({
    type: UserPurchaseActionType.GET_USER_PURCHASE_FAILURE,
    payload: error
});
