import { put, all, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { host } from '../../api.config';
import SpeakerOpportunityTypes from './speaker-opportunity.types';
import {unAuthorized} from '../../factory';

import {
    addSpeakerOpportunityFailure,
    addSpeakerOpportunitySuccess,
    getSpeakerOpportunitySuccess,
    getSpeakerOpportunityFailure
} from './speaker-opportunity.action.js';

const MySwal = withReactContent(Swal);

export function* addSpeakerOpportunityStart({payload: {company, email, fax, firstName, industries, jobTitle, lastName, phone}}){
    try {
        const addedProduct = yield axios.post(`${host}/api/speaker-opportunity`, {company, email, fax, firstName, industries, jobTitle, lastName, phone});
        if(addedProduct.status === 200 || addedProduct.status === 201){
            yield put(addSpeakerOpportunitySuccess(addedProduct));
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Speaker Opportunity Added Successfully.',
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
        yield put(addSpeakerOpportunityFailure(error));
    }
}

export function* getSpeakerOpportunityStart(){
    try {
        const addedProduct = yield axios.get(`${host}/api/speaker-opportunity`);
        if(addedProduct.status === 200 || addedProduct.status === 201){
            yield put(getSpeakerOpportunitySuccess(addedProduct));
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
        yield put(getSpeakerOpportunityFailure(error));
        if(error.response.status === 401 || error.response.status === 403){
            yield put(unAuthorized(error));
        }
    }
}


export function* onSpeakerOpportunityAddStart() {
    yield takeLatest(SpeakerOpportunityTypes.ADD_SPEAKER_OPPORTUNITY_START, addSpeakerOpportunityStart)
}

export function* onSpeakerOpportunityGetStart() {
    yield takeLatest(SpeakerOpportunityTypes.GET_SPEAKER_OPPORTUNITY_START, getSpeakerOpportunityStart)
}

export function* SpeakerOpportunitySaga(){
    yield all([
        call(onSpeakerOpportunityAddStart),
        call(onSpeakerOpportunityGetStart)
    ]);
}