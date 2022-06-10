import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectUserPurchaseListFetching } from "../../redux/user-purchase-list/user-purchase-list.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import AdminUserPurchaseList from "./admin-user-purchase-list.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectUserPurchaseListFetching
});

const AdminUserPurchaseListContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(AdminUserPurchaseList);

export default AdminUserPurchaseListContainer;