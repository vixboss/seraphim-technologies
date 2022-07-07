import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import ProductActionType from './product.types';
import {unAuthorized} from '../../factory';

import { 
        getAllProductTitleSuccess, 
        getAllProductTitleFailure, 
        addProductTitleSuccess, 
        addProductTitleFailure,
        updateProductTitleSuccess,
        updateProductTitleFailure,
        deleteProductTitleSuccess,
        deleteProductTitleFailure,
        addProductSuccess,
        addProductFailure,
        deleteProductSuccess,
        deleteProductFailure,
        getProductByIdSuccess,
        getProductByIdFailure,
        updateProductSuccess,
        updateProductFailure,
        getProductByNameSuccess,
        getProductByNameFailure,
    } from './product.action';

const MySwal = withReactContent(Swal);
export function* getProductTitleStart() {
    try {
        const productTitle = yield axios.get(`${host}/api/product-types`);
        yield put(getAllProductTitleSuccess(productTitle.data));
    } catch (error) {
        let err = error.response.data;
        yield put(getAllProductTitleFailure(error));

        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(unAuthorized(error));
    }
}

export function* addProductTitleStart({payload: {title}}) {
    try {
        const addedProductType = yield axios.post(`${host}/api/product-type`, {title});
        if(addedProductType.status === 200 || addedProductType.status === 201){
            yield put(addProductTitleSuccess(addedProductType.data));
            yield getProductTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Title Added Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(addProductTitleFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* addProductStart({payload: {title, items}}){
    try {
        const addedProduct = yield axios.post(`${host}/api/product`, {title, items});
        if(addedProduct.status === 200 || addedProduct.status === 201){
            yield put(addProductSuccess(addedProduct));
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Added Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(addProductFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* updateProductTitleStart({payload: {id, title}}) {
    try {
        const updateProductType = yield axios.put(`${host}/api/product-type/${id}`, {title});
        if(updateProductType.status === 200 || updateProductType.status === 201){
            yield put(updateProductTitleSuccess(updateProductType.data));
            yield getProductTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Title Updated Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(updateProductTitleFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* getProductById({payload: {id}}){
    try {
        const productById = yield axios.get(`${host}/api/product/${id}`);
        if(productById.status === 200 || productById.status === 201){
            yield put(getProductByIdSuccess(productById));
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(getProductByIdFailure(error));
        yield put(unAuthorized(error));
    }
}
export function* getProductByName({payload}){
    try {
        var name = payload;
        const productById = yield axios.post(`${host}/api/product-by-name`, {name});
        if(productById.status === 200 || productById.status === 201){
            yield put(getProductByNameSuccess(productById));
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(getProductByNameFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* deleteProductTitleStart({payload}) {
    try {
        const id = payload;
        const deleteProductType = yield axios.delete(`${host}/api/product-type/${id}`);
        if(deleteProductType.status === 200 || deleteProductType.status === 201){
            yield put(deleteProductTitleSuccess(deleteProductType.data));
            yield getProductTitleStart();
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Title Deleted Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(deleteProductTitleFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* deleteProductStart({payload}) {
    try {
        const id = payload;
        const deletedProduct = yield axios.delete(`${host}/api/product/${id}`);
        if(deletedProduct.status === 200 || deletedProduct.status === 201){
            yield put(deleteProductSuccess(deletedProduct));
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Title Deleted Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(deleteProductFailure(error));
        yield put(unAuthorized(error));
    }
}

export function* deletionConfirmation() {
    let confirmed = false;
    yield Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        confirmed = true;
    }
    });
    return confirmed;
}

export function* updateProductStart({payload}){
    try {
        console.log(payload);
        const updatedProduct = yield axios.put(`${host}/api/product/${payload.items[0].id}`, payload);
        if(updatedProduct.status === 200 || updatedProduct === 201 ){
            yield put(updateProductSuccess(updatedProduct));
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product Updated Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        let err = error.response.data;
        MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500
        });
        yield put(updateProductFailure(error));
        yield put(unAuthorized(error));
    }
}


export function* deleteProductTitleConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteProductTitleStart({payload});
}

export function* deleteProductConfirmation({payload}) {
    const confirmed = yield deletionConfirmation();
    if(confirmed) yield deleteProductStart({payload});
}

export function* onProductTitleGetStart() {
    yield takeLatest(ProductActionType.PRODUCT_TITLE_GET_START, getProductTitleStart);
}

export function* onProductTitleAddStart() {
    yield takeLatest(ProductActionType.PRODUCT_TITLE_ADD_START, addProductTitleStart);
}

export function* onProductTitleUpdateStart() {
    yield takeLatest(ProductActionType.PRODUCT_TITLE_UPDATE_START, updateProductTitleStart);
}

export function* onProductTitleDeleteStart() {
    yield takeLatest(ProductActionType.PRODUCT_TITLE_DELETE_START, deleteProductTitleConfirmation);
}

export function* onProductAddStart() {
    yield takeLatest(ProductActionType.PRODUCT_ADD_START, addProductStart)
}

export function* onProductgetById() {
    yield takeLatest(ProductActionType.PRODUCT_GET_BY_ID_START, getProductById )
}

export function* onProductgetByName() {
    yield takeLatest(ProductActionType.PRODUCT_GET_BY_NAME_START, getProductByName )
}
export function* onProductUpdateStart() {
    yield takeLatest(ProductActionType.PRODUCT_UPDATE_START, updateProductStart)
}

export function* onProductDeleteStart() {
    yield takeLatest(ProductActionType.PRODUCT_DELETE_START, deleteProductConfirmation)
}
export function* ProductSaga(){
    yield all([
        call(onProductTitleGetStart),
        call(onProductTitleAddStart),
        call(onProductTitleUpdateStart),
        call(onProductTitleDeleteStart),
        call(onProductAddStart),
        call(onProductDeleteStart),
        call(onProductgetById), 
        call(onProductUpdateStart),
        call(onProductgetByName)
    ]);
}