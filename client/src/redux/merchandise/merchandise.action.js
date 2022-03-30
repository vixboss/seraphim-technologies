import MerchandiseTypes from './merchandise.types';

export const getAllMerchandiseTitleStart = () => ({
    type: MerchandiseTypes.MERCHANDISE_GET_START
})

export const getAllMerchandiseTitleSuccess = (merchandiseTitle) => ({
    type: MerchandiseTypes.MERCHANDISE_GET_SUCCESS,
    payload: merchandiseTitle
})

export const getAllMerchandiseTitleFailure = (error) => ({
    type: MerchandiseTypes.MERCHANDISE_GET_FAILURE,
    payload: error
})

export const getMerchandiseTitleByIdStart = () => ({
    type: MerchandiseTypes.MERCHANDISE_GET_BY_ID_START
})

export const getMerchandiseTitleByIdSuccess = (merchandiseTitle) => ({
    type: MerchandiseTypes.MERCHANDISE_GET_BY_ID_SUCCESS,
    payload: merchandiseTitle
})

export const getMerchandiseTitleByIdFailure = (error) => ({
    type: MerchandiseTypes.MERCHANDISE_GET_BY_ID_FAILURE,
    payload: error
})

export const addMerchandiseTitleStart = (data) => ({
    type: MerchandiseTypes.MERCHANDISE_ADD_START,
    payload: data
})

export const addMerchandiseTitleSuccess = (merchandiseTitle) => ({
    type: MerchandiseTypes.MERCHANDISE_ADD_SUCCESS,
    payload: merchandiseTitle
})

export const addMerchandiseTitleFailure = (error) => ({
    type: MerchandiseTypes.MERCHANDISE_ADD_FAILURE,
    payload: error
})

export const updateMerchandiseTitleStart = (data) => ({
    type: MerchandiseTypes.MERCHANDISE_UPDATE_START,
    payload: data
})

export const updateMerchandiseTitleSuccess = (merchandiseTitle) => ({
    type: MerchandiseTypes.MERCHANDISE_UPDATE_SUCCESS,
    payload: merchandiseTitle
})

export const updateMerchandiseTitleFailure = (error) => ({
    type: MerchandiseTypes.MERCHANDISE_UPDATE_FAILURE,
    payload: error
})

export const deleteMerchandiseTitleStart = (data) => ({
    type: MerchandiseTypes.MERCHANDISE_DELETE_START,
    payload: data
})

export const deleteMerchandiseTitleSuccess = (merchandiseTitle) => ({
    type: MerchandiseTypes.MERCHANDISE_DELETE_SUCCESS,
    payload: merchandiseTitle
})

export const deleteMerchandiseTitleFailure = (error) => ({
    type: MerchandiseTypes.MERCHANDISE_DELETE_FAILURE,
    payload: error
})