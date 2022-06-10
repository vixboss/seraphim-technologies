import React , { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ProductDescriptionPage from './pages/product-description-page/product-description-page.component';
import AdminLoginPage from './pages/admin-login/admin-login.component';
import AdminPanelPage from './pages/admin-panel/admin-panel.component';
import AdminHeader from './components/admin-header/admin-header-component';
import AdminTitle from './components/admin-title/admin-title.component';
import AdminProduct from './components/admin-product/admin-product.component';
import MerchandiseComponent from './components/merchandise/merchandise.component';
import PrivacyPolicyPageComponent from './pages/privacy-policy/privacy-policy.component';
import TermsAndConditionsPageComponent from './pages/terms-and-conditions/terms-and-conditions.component';
import RefundAndCancellationPageComponent from './pages/refund-cancellation/refund-cancellation.component';
import UserPurchasesPages from './pages/user-purchases/user-purchases.component';
import AdminBanner from './components/admin-banner/admin-banner.component';
import AdminDashboard from './components/admin-dashboard/admin-dashboard.component';

import { checkUserSession } from './redux/user/user.action';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser }  from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { selectCurrentAdmin } from './redux/admin/admin.selector';

const App = ({ checkUserSession, currentuser, currentAdmin }) => {
  
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  
  var address = window.location.pathname;
  address = address.split('/');
  
  return (
    <div className="App">
      <GlobalStyle />
      {
        address.indexOf('admin') === -1 ? <Header />: <AdminHeader/>
      }
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path= '/shop/:id/:ids' component= {ProductDescriptionPage}/>
        <Route path='/shop' component = {ShopPage}/>
        <Route exact path='/checkout' component = {CheckoutPage}/>
        <Route exact path='/signin' 
          render = {
            () => currentuser ? <Redirect to='/' />: <SignInAndSignUpPage/>
          }
        />
        <Route exact path = '/refund-cancellation' component={ RefundAndCancellationPageComponent }/>
        <Route exact path = '/terms' component={ TermsAndConditionsPageComponent } />
        <Route exact path = '/privacy-policy' component = { PrivacyPolicyPageComponent }/>
        <Route path='/admin/panel' component= {AdminPanelPage}/>
        <Route exact path = '/admin/title' component={AdminTitle}/>
        <Route exact path = '/admin/product' component={AdminProduct}/>
        <Route exact path = '/admin/banner' component={AdminBanner}/>
        <Route exact path = '/admin/merchandise' component={MerchandiseComponent}/>
        <Route exact path = '/admin/user-purchase' component = {UserPurchasesPages}/>
        <Route exact path = '/admin/dashboard' component={AdminDashboard} />
        <Route exact path='/admin'
          render = {
            () => currentAdmin ? <Redirect to='/admin/title'/> : <AdminLoginPage/>
          }
        />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentuser: selectCurrentUser,
  collectionsArray : selectCollectionsForPreview,
  currentAdmin: selectCurrentAdmin
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
