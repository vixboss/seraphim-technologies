import React, { useState } from 'react';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import SpeakerContainer from '../../components/speaker/speaker.container';
import { getSpeakerStart } from '../../redux/speaker/speaker.action';
import { selectAllSpeakers } from '../../redux/speaker/speaker.selector';
import './speakers.styles.scss';

const SpeakersPage = ({allSpeakers, getSpeakerStart}) => {
    useState(() => {
        getSpeakerStart();
    }, [getSpeakerStart]);

    return(
        <SpeakerContainer allSpeakers = {allSpeakers}/>
    )
}

const mapStateToProps = createStructuredSelector({
    allSpeakers: selectAllSpeakers
});
const mapDispatchToProps = dispatch => ({
    getSpeakerStart: () => dispatch(getSpeakerStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(SpeakersPage);