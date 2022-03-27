import ProductActionType from './product.types';

export const getAllProductTitleStart = () => ({
    type: ProductActionType.PRODUCT_TITLE_GET_START
});

export const getAllProductTitleSuccess = (productTitle) =>({
    type: ProductActionType.PRODUCT_TITLE_GET_SUCCESS,
    payload: productTitle
});

export const getAllProductTitleFailure = (error) => ({
    type: ProductActionType.PRODUCT_TITLE_GET_FAILURE,
    payload: error
});

export const addProductTitleStart = title => ({
    type: ProductActionType.PRODUCT_TITLE_ADD_START,
    payload: title
});

export const addProductTitleSuccess = productTitle => ({
    type: ProductActionType.PRODUCT_TITLE_ADD_SUCCESS,
    payload: productTitle
});

export const addProductTitleFailure = error => ({
    type: ProductActionType.PRODUCT_TITLE_ADD_FAILURE,
    payload: error
})

export const updateProductTitleStart = data => ({
    type: ProductActionType.PRODUCT_TITLE_UPDATE_START,
    payload: data
})

export const updateProductTitleSuccess = data => ({
    type: ProductActionType.PRODUCT_TITLE_UPDATE_SUCCESS,
    payload: data
})

export const updateProductTitleFailure = error => ({
    type: ProductActionType.PRODUCT_TITLE_UPDATE_FAILURE,
    payload: error
})

export const deleteProductTitleStart = data => ({
    type: ProductActionType.PRODUCT_TITLE_DELETE_START,
    payload: data
})

export const deleteProductTitleSuccess = data => ({
    type: ProductActionType.PRODUCT_TITLE_DELETE_SUCCESS,
    payload: data
})

export const deleteProductTitleFailure = error => ({
    type: ProductActionType.PRODUCT_TITLE_DELETE_FAILURE,
    payload: error
})

export const addProductStart = data => ({
    type: ProductActionType.PRODUCT_ADD_START,
    payload: data
})

export const addProductSuccess = data => ({
    type: ProductActionType.PRODUCT_ADD_SUCCESS,
    payload: data
})

export const addProductFailure = error => ({
    type: ProductActionType.PRODUCT_ADD_FAILURE,
    payload: error
})

export const deleteProductStart = data => ({
    type: ProductActionType.PRODUCT_DELETE_START,
    payload: data
})

export const deleteProductSuccess = data => ({
    type: ProductActionType.PRODUCT_DELETE_SUCCESS,
    payload: data
})

export const deleteProductFailure = error => ({
    type: ProductActionType.PRODUCT_DELETE_FAILURE,
    payload: error
})

export const getProductByIdStart = data => ({
    type: ProductActionType.PRODUCT_GET_BY_ID_START,
    payload: data
})

export const getProductByIdSuccess = data => ({
    type: ProductActionType.PRODUCT_GET_BY_ID_SUCCESS,
    payload: data
})

export const getProductByIdFailure = error => ({
    type: ProductActionType.PRODUCT_GET_BY_ID_FAILURE,
    payload: error
})

export const updateProductStart = data => ({
    type: ProductActionType.PRODUCT_UPDATE_START,
    payload: data
})

export const updateProductSuccess = data => ({
    type: ProductActionType.PRODUCT_UPDATE_SUCCESS,
    payload: data
})

export const updateProductFailure = error => ({
    type: ProductActionType.PRODUCT_UPDATE_FAILURE,
    payload: error
})
