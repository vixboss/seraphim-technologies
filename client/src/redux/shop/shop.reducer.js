import ShopActionTypes from './shop.types';
import { collectionItemsDescription, productDetailArrayFilter } from './shop.utils';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
    errorMessageItemDetails: undefined,
    isFetchingItemDetails: false
}

const shopReducer =(state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case ShopActionTypes.SEARCH_COLLECTIONS_START:
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                isFetching: true
            }
        case ShopActionTypes.SEARCH_COLLECTIONS_SUCCESS: 
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS: 
            return{
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.SEARCH_COLLECTIONS_FAILURE:
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS:
            return {
                ...state,
                isFetchingItemDetails: false,
                collectionItem: (productDetailArrayFilter(collectionItemsDescription(state.collections, action.payload)))
            }

        // case ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_START:
        //     return {
        //         ...state,
        //         isFetchingItemDetails: true
        //     }
        // case ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_SUCCESS:
        //     return {
        //         ...state,
        //         isFetchingItemDetails: false,
        //         collectionItem: (productDetailArrayFilter(collectionItemsDescription(state.collections, action.payload)))
        //     }
        // case ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_FAILURE:
        //     return {
        //         ...state,
        //         isFetchingItemDetails: false,
        //         errorMessageItemDetails: action.payload
        //     }
        default: 
            return state;
    }
}

export default shopReducer;