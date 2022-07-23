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

export const addUserPurchaseStart = (payload) => ({
    type: UserPurchaseActionType.ADD_USER_PURCHASE_START,
    payload: payload
});

export const addUserPurchaseSuccess = (userPurchase) => ({
    type: UserPurchaseActionType.ADD_USER_PURCHASE_SUCCESS,
    payload: userPurchase
});

export const addUserPurchaseFailure = (error) => ({
    type: UserPurchaseActionType.ADD_USER_PURCHASE_FAILURE,
    payload: error
});

export const updateUserPurchaseDeliveryStatusStart = (payload) => ({
    type: UserPurchaseActionType.UPDATE_USER_PURCHASE_DELIVERY_STATUS_START,
    payload: payload
});

export const updateUserPurchaseDeliveryStatusSuccess = (userPurchase) => ({
    type: UserPurchaseActionType.UPDATE_USER_PURCHASE_DELIVERY_STATUS_SUCCESS,
    payload: userPurchase
});

export const updateUserPurchaseDeliveryStatusFailure = (error) => ({
    type: UserPurchaseActionType.UPDATE_USER_PURCHASE_DELIVERY_STATUS_FAILURE,
    payload: error
});

export const searchUserPurchaseStart = (payload) => ({
    type: UserPurchaseActionType.SEARCH_USER_PURCHASE_START,
    payload: payload
});

export const searchUserPurchaseSuccess = (userPurchase) => ({
    type: UserPurchaseActionType.SEARCH_USER_PURCHASE_SUCCESS,
    payload: userPurchase
});

export const searchUserPurchaseFailure = (error) => ({
    type: UserPurchaseActionType.SEARCH_USER_PURCHASE_FAILURE,
    payload: error
});
