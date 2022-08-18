import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { isFetchingSpeaker } from "../../redux/speaker/speaker.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import SpeakerListComponent from './speaker-list.component';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingSpeaker
});

const SpeakerListContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(SpeakerListComponent);

export default SpeakerListContainer;