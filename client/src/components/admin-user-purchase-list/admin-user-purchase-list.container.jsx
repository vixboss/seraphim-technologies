import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectUserPurchaseFetching } from "../../redux/user-purchase/user-purchase.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import AdminUserPurchaseList from "./admin-user-purchase-list.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectUserPurchaseFetching
});

const AdminUserPurchaseListContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(AdminUserPurchaseList);

export default AdminUserPurchaseListContainer;