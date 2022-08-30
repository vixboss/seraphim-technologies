import WishlistActionType from "./wishlist.types";

const INITIAL_STATE = {
    wishlist: null,
    isFetching: false,
    data: null
}

const wishlistReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case WishlistActionType.GET_WISHLIST_START:
            return {
                ...state,
                isFetching: true
            }
        case WishlistActionType.GET_WISHLIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            }
        case WishlistActionType.GET_WISHLIST_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default wishlistReducer;