import { createSelector } from "reselect";

const selectSubscription = state => state.subscription;

export const selectAllSubscriptions = createSelector(
    [selectSubscription],
    (subscriptionData) => subscriptionData.data ? subscriptionData.data.data : []
);

export const isFetchingSubscription = createSelector(
    [selectSubscription],
    (subscriptionData) => subscriptionData.isFetching 
);