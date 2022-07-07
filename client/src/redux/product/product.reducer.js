import ProductActionType from './product.types';

const INITIAL_STATE = {
    product: null,
    productTitle: null,
    error: null,
    isFetching: false,
    responseData:[],
    productById:[],
    productByName:[]
}

const productReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case ProductActionType.PRODUCT_TITLE_GET_START:
            return{
                ...state,
                isFetching: true
            }
        case ProductActionType.PRODUCT_TITLE_GET_SUCCESS:
            return {
                ...state,
                productTitle: action.payload,
                isFetching:false,
                error: null
            }
        case ProductActionType.PRODUCT_TITLE_GET_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching:false
            }
        case ProductActionType.PRODUCT_UPDATE_SUCCESS:
        case ProductActionType.PRODUCT_DELETE_SUCCESS:
        case ProductActionType.PRODUCT_ADD_FAILURE:
        case ProductActionType.PRODUCT_ADD_SUCCESS: 
            return {
                ...state,
                responseData: action.payload
            }

        case ProductActionType.PRODUCT_GET_BY_ID_START:
            return{
                ...state
            }
        case ProductActionType.PRODUCT_GET_BY_ID_SUCCESS:
            return{
                ...state,
                productById: action.payload,
                error: null
            }
        case ProductActionType.PRODUCT_GET_BY_ID_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        case ProductActionType.PRODUCT_GET_BY_NAME_START:
            return{
                ...state,
                isFetching: true
            }
        case ProductActionType.PRODUCT_GET_BY_NAME_SUCCESS:
            return{
                ...state,
                productByName: action.payload,
                isFetching: false,
                error: null
            }
        case ProductActionType.PRODUCT_GET_BY_NAME_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;