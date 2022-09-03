import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AdminSpeakerOpportunityContainer from '../../components/admin-speaker-opportunity/admin-speaker-opportunity.container';
import { getSpeakerOpportunityStart } from '../../redux/speaker-opportunity/speaker-opportunity.action';
import { selectAllSpeakersOpportunity } from '../../redux/speaker-opportunity/speaker-opportunity.selector';

const AdminSpeakerOpportunity = ({getSpeakerOpportunityStart, speakerOpportunity}) => {
    useEffect(() => {
        getSpeakerOpportunityStart();
    }, [getSpeakerOpportunityStart]);

    return(
        <Container>
            <AdminSpeakerOpportunityContainer speakerOpportunity = {speakerOpportunity}/>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    getSpeakerOpportunityStart: () => dispatch(getSpeakerOpportunityStart())
});

const mapStateToProps = createStructuredSelector({
    speakerOpportunity: selectAllSpeakersOpportunity
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSpeakerOpportunity);