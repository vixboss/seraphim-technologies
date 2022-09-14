import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SuggestTopicListComponent from './suggest-topic-list.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {isFetchingSuggestTopic} from '../../redux/suggest-topic/suggest-topic.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingSuggestTopic
});

const SuggestTopicListContainer = compose(
    connect(mapStateToProps), WithSpinner
)(SuggestTopicListComponent);

export default SuggestTopicListContainer;