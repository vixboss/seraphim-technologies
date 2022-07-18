import { createSelector } from "reselect";

const selectUserPurchase = state => state.userPurchase;

export const selectUserPurchaseFetching = createSelector(
    [selectUserPurchase],
    userPurchase=> userPurchase.isFetching
);

export const selectUserAllPurchase = createSelector(
    [selectUserPurchase],
    userPurchase => userPurchase.userPurchase
);