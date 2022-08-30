import { createSelector } from "reselect";

const selectWishlist = state => state.wishlist;

export const selectAllWishlists = createSelector(
    [selectWishlist],
    (wishlistData) => wishlistData.data ? wishlistData.data.data : []
);

export const isFetchingWishlist = createSelector(
    [selectWishlist],
    (wishlistData) => wishlistData.isFetching 
)