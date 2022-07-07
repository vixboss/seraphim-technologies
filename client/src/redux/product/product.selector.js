import { createSelector } from "reselect";

const selectProduct = state => state.product;
export const selectProductType = createSelector([selectProduct], (productType)=> productType.productTitle ? productType.productTitle.productTypeArray : []);

export const selectIsProductTypeFetching = createSelector(
    [selectProduct],
    product=> product.isFetching
);

export const selectResponseData = createSelector(
    [selectProduct],
    product => product.responseData
);

export const selectProductById = createSelector(
    [selectProduct],
    product => product.productById
)

export const selectProductByName = createSelector(
    [selectProduct],
    product => product.productByName
);