import WishlistActionType from './wishlist.types';

export const addWishlistStart = (data) => ({
    type: WishlistActionType.ADD_WISHLIST_START,
    payload: data
});

export const addWishlistSuccess = (data) => ({
    type: WishlistActionType.ADD_WISHLIST_SUCCESS,
    payload: data
});

export const addWishlistFailure = (error) => ({
    type: WishlistActionType.ADD_WISHLIST_FAILURE,
    payload: error
});

export const getWishlistStart = (data) => ({
    type: WishlistActionType.GET_WISHLIST_START,
    payload:data
});

export const getWishlistSuccess = (data) => ({
    type: WishlistActionType.GET_WISHLIST_SUCCESS,
    payload: data
});

export const getWishlistFailure = (error) => ({
    type: WishlistActionType.GET_WISHLIST_FAILURE,
    payload: error
});

export const removeWishlistStart = (data) => ({
    type: WishlistActionType.REMOVE_WISHLIST_START,
    payload:data
});

export const removeWishlistSuccess = (data) => ({
    type: WishlistActionType.REMOVE_WISHLIST_SUCCESS,
    payload: data
});

export const removeWishlistFailure = (error) => ({
    type: WishlistActionType.REMOVE_WISHLIST_FAILURE,
    payload: error
});