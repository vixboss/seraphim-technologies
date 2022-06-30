import DiscountActionTypes from "./discount.types";

export const getAllDiscountStart = () => ({
    type: DiscountActionTypes.DISCOUNT_GET_START
})

export const getAllDiscountSuccess = (discount) => ({
    type: DiscountActionTypes.DISCOUNT_GET_SUCCESS,
    payload: discount
})

export const getAllDiscountFailure = (error) => ({
    type: DiscountActionTypes.DISCOUNT_GET_FAILURE,
    payload: error
})

export const addDiscountStart = (discount) => ({
    type: DiscountActionTypes.DISCOUNT_ADD_START,
    payload: discount
})

export const addDiscountSuccess = (discount) => ({
    type: DiscountActionTypes.DISCOUNT_ADD_SUCCESS,
    payload: discount
})

export const addDiscountFailure = (error) => ({
    type: DiscountActionTypes.DISCOUNT_ADD_FAILURE,
    payload: error
})

export const updateDiscountStart = (discount) => ({
    type: DiscountActionTypes.DISCOUNT_UPDATE_START,
    payload: discount
})

export const updateDiscountSuccess = (discount) => ({
    type: DiscountActionTypes.DISCOUNT_UPDATE_SUCCESS,
    payload: discount
})

export const updateDiscountFailure = (error) => ({
    type: DiscountActionTypes.DISCOUNT_UPDATE_FAILURE,
    payload: error
})

export const deleteDiscountStart = data => ({
    type: DiscountActionTypes.DISCOUNT_DELETE_START,
    payload: data
})

export const deleteDiscountSuccess = data => ({
    type: DiscountActionTypes.DISCOUNT_DELETE_SUCCESS,
    payload: data
})

export const deleteDiscountFailure = error => ({
    type: DiscountActionTypes.DISCOUNT_DELETE_FAILURE,
    payload: error
})

export const discountGetByNameStart = data => ({
    type: DiscountActionTypes.DISCOUNT_GET_BY_NAME_START,
    payload: data
})

export const discountGetByNameSuccess = data => ({
    type: DiscountActionTypes.DISCOUNT_GET_BY_NAME_SUCCESS,
    payload: data
})

export const discountGetByNameFailure = error => ({
    type: DiscountActionTypes.DISCOUNT_GET_BY_NAME_FAILURE,
    payload: error
})

