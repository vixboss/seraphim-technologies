import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from "axios";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import { fetchCollectionsFailure, fetchCollectionsSuccess, searchCollectionsSuccess, searchCollectionsFailure } from './shop.actions';
import { host } from "../../api.config";

export function* fetchCollectionsAsync() {
    try {
        // const collectionRef = firestore.collection('collections');
        // const snapshot = yield collectionRef.get();
        const snapshot = yield axios.get(`${host}/api/product`);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }

        /***************************************/
        /***************************************/
        // Another way to call the function
        /***************************************/
        /***************************************/

        // collectionRef.get().then(snapshot =>{
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionsMap));
        // }).catch(error => {
        //     dispatch(fetchCollectionsFailure(error.message));
        // });
}

export function* searchCollectionsAsync(data) {
    try {
        // const collectionRef = firestore.collection('collections');
        // const snapshot = yield collectionRef.get();
        const snapshot = yield axios.post(`${host}/api/search-product`, data);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(searchCollectionsSuccess(collectionsMap));

    } catch(error){
        yield put(searchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* searchCollectionsStart() {
    yield takeLatest(ShopActionTypes.SEARCH_COLLECTIONS_START, searchCollectionsAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
        call(searchCollectionsStart)
    ])
}