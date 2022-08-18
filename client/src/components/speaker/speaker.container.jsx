import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { isFetchingSpeaker } from "../../redux/speaker/speaker.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import SpeakerComponent from './speaker.component';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingSpeaker
});

const SpeakerContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(SpeakerComponent);

export default SpeakerContainer;