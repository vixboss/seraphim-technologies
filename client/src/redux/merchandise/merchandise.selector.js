import { createSelector } from "reselect";

const selectMerchandise = state => state.merchandise;

export const selectMerchandiseTitle = createSelector([selectMerchandise], (merchandiseTitle) =>
    merchandiseTitle.merchandise ? merchandiseTitle.merchandise: []
);

export const selectMerchandiseTitleAsArray = createSelector([selectMerchandise],   merchandiseTitle => {
    var arr = [];
    if(merchandiseTitle.merchandise !== null){
        merchandiseTitle.merchandise.map(val => {
            arr.push(val);
        });
    }

    return arr;
});

export const isMerchandiseFetching = createSelector([selectMerchandise], merchandise => merchandise.isFetching);