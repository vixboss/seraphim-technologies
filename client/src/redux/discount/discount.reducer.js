import DiscountActionTypes from "./discount.types";

const INITIAL_STATE = {
    isFetching: false,
    responseData:[],
    discount: null,
    error: null,
    coupon: null
}

const discountReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case DiscountActionTypes.DISCOUNT_GET_BY_NAME_START:
        case DiscountActionTypes.DISCOUNT_GET_START:
            return {
                ...state,
                isFetching: true
            }
        case DiscountActionTypes.DISCOUNT_GET_SUCCESS:
            return {
                ...state,
                discount: action.payload,
                isFetching: false,
                error: null
            }
        case DiscountActionTypes.DISCOUNT_GET_BY_NAME_SUCCESS:
            return {
                ...state,
                coupon: action.payload,
                isFetching: false,
                error: null
            }
        case DiscountActionTypes.DISCOUNT_GET_BY_NAME_FAILURE:
        case DiscountActionTypes.DISCOUNT_GET_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching:false
            }
        case DiscountActionTypes.DISCOUNT_ADD_FAILURE:
        case DiscountActionTypes.DISCOUNT_ADD_SUCCESS: 
            return {
                ...state,
                responseData: action.payload
            }
        default:
            return state;
    }
}

export default discountReducer;

