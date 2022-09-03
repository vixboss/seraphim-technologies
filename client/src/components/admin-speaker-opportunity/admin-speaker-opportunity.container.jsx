import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { isFetchingSpeakerOpportunity } from "../../redux/speaker-opportunity/speaker-opportunity.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import AdminSpeakerOpportunityComponent from './admin-speaker-opportunity.component';

const mapStateToProps = createStructuredSelector({
    isLoading: isFetchingSpeakerOpportunity
});

const AdminSpeakerOpportunityContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(AdminSpeakerOpportunityComponent);

export default AdminSpeakerOpportunityContainer;