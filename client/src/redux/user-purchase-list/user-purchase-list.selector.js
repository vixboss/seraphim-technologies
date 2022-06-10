import { createSelector } from "reselect";

const selectUserPurchaseList = state => state.userPurchaseList;

export const selectUserPurchaseListFetching = createSelector(
    [selectUserPurchaseList],
    userPurchaseList=> userPurchaseList.isFetching
);

export const selectUserAllPurchaseList = createSelector(
    [selectUserPurchaseList],
    userPurchaseList => userPurchaseList.items
);