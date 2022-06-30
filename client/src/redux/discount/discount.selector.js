import { createSelector } from "reselect";

const selectDiscount = state => state.discount;

export const selectAllDiscount = createSelector(
    [selectDiscount],
    (discount) => discount ? discount: []
);

export const selectIsFetchingDiscount = createSelector(
    [selectDiscount],
    (discount) => discount.isFetching
); 
