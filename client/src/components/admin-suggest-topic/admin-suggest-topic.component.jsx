import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row } from 'react-bootstrap';

import SuggestTopicListContainer from '../suggest-topic-list/suggest-topic-list.container';
import {selectAllSuggestTopics} from '../../redux/suggest-topic/suggest-topic.selector';
import {getSuggestTopicStart} from '../../redux/suggest-topic/suggest-topic.action';

const AdminSuggestTopicComponent = ({getSuggestTopicStart, allSuggestTopic}) => {

    useEffect(() => {
        getSuggestTopicStart();
    }, [getSuggestTopicStart]);

    return (
        <Container>
            <Row>
                <SuggestTopicListContainer allSuggestTopic = {allSuggestTopic}/>
            </Row>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    getSuggestTopicStart: () => dispatch(getSuggestTopicStart())
});

const mapStateToProps = createStructuredSelector({
    allSuggestTopic: selectAllSuggestTopics
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminSuggestTopicComponent);