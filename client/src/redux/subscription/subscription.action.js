import SubscriptionActionTypes from "./subscription.types";

export const addSubscriptionStart = (data) => ({
    type: SubscriptionActionTypes.ADD_SUBSCRIPTION_START,
    payload: data
});

export const addSubscriptionSuccess = (data) => ({
    type:SubscriptionActionTypes.ADD_SUBSCRIPTION_SUCCESS,
    payload: data
});

export const addSubscriptionFailure = (errorMessage) => ({
    type:SubscriptionActionTypes.ADD_SUBSCRIPTION_FAILURE,
    payload: errorMessage
});

export const getSubscriptionStart = () => ({
    type: SubscriptionActionTypes.GET_SUBSCRIPTION_START
});

export const getSubscriptionSuccess = (data) => ({
    type:SubscriptionActionTypes.GET_SUBSCRIPTION_SUCCESS,
    payload: data
});

export const getSubscriptionFailure = (errorMessage) => ({
    type:SubscriptionActionTypes.GET_SUBSCRIPTION_FAILURE,
    payload: errorMessage
});

export const updateSubscriptionStart = (data) => ({
    type: SubscriptionActionTypes.UPDATE_SUBSCRIPTION_START,
    payload: data
});

export const updateSubscriptionSuccess = (data) => ({
    type:SubscriptionActionTypes.UPDATE_SUBSCRIPTION_SUCCESS,
    payload: data
});

export const updateSubscriptionFailure = (errorMessage) => ({
    type:SubscriptionActionTypes.UPDATE_SUBSCRIPTION_FAILURE,
    payload: errorMessage
});

