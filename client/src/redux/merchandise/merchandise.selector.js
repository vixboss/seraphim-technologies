import { createSelector } from "reselect";

const selectMerchandise = state => state.merchandise;

export const selectMerchandiseTitle = createSelector([selectMerchandise], (merchandiseTitle) =>
    merchandiseTitle.merchandise ? merchandiseTitle.merchandise: []
);

export const isMerchandiseFetching = createSelector([selectMerchandise], merchandise => merchandise.isFetching);