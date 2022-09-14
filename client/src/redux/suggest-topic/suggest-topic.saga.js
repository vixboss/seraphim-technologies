import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import SuggestTopicActionTypes from './suggest-topic.types';
import {unAuthorized} from '../../factory';

import {
    addSuggestTopicSuccess,
    addSuggestTopicFailure,
    getSuggestTopicSuccess,
    getSuggestTopicFailure
} from './suggest-topic.action';

const MySwal = withReactContent(Swal);

export function* addSuggestTopicStart({payload}){
    try {
        const {email,industry,name,phone,title, topicSuggestion} = payload;
        const addSuggestTopic = yield axios.post(`${host}/api/suggest-topic`, {email,industry,name,phone,title,topicSuggestion});
        if(addSuggestTopic.status === 200 || addSuggestTopic.status === 201){
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Suggest Topic Added Successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            var redirectLocation = window.location.origin + '/';
            setTimeout(() => {
                window.location.href = redirectLocation;
            }, 2000);
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
        yield put(addSuggestTopicFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}
export function* getSuggestTopicStart() {
    try {
        const getSuggestTopic = yield axios.get(`${host}/api/suggest-topic`);
        if(getSuggestTopic.status === 200 || getSuggestTopic.status === 201){
            yield put(getSuggestTopicSuccess(getSuggestTopic));
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
        yield put(getSuggestTopicFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}

export function* onSuggestTopicAddStart() {
    yield takeLatest(SuggestTopicActionTypes.ADD_SUGGEST_TOPIC_START, addSuggestTopicStart)
}
export function* onSuggestTopicGetStart() {
    yield takeLatest(SuggestTopicActionTypes.GET_SUGGEST_TOPIC_START, getSuggestTopicStart)
}

export function* SuggestTopicSaga(){
    yield all([
        call(onSuggestTopicAddStart),
        call(onSuggestTopicGetStart)
    ]);
}