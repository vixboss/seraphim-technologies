import React , { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
import DiscountPage from './pages/discount/discount.component';
import AdminBanner from './components/admin-banner/admin-banner.component';
import AdminDashboard from './components/admin-dashboard/admin-dashboard.component';
import PaymentPage from './pages/payment-page/payment-page.component';
import ForgotPasswordComponent from './components/forgot-password/forgot-password.component';
import ResetPasswordComponent from './components/reset-password/reset-password.component';
import ErrorPage from './pages/error-page/error-page.component';
import SubscribePage from './pages/subscribepage/subscribepage.component';
import AboutAndContactPage from './pages/about-and-contact/about-and-contact.component';
import FaqPage from './pages/faq/faq.component';
import SpeakersPage from './pages/speakers/speakers.page';
import AdminSpeaker from './components/admin-speaker/admin-speaker.component';
import SpeakerDetailComponent from './components/speaker-detail/speaker-detail.component';
import AdminSubscribeComponent from './components/admin-subscribe/admin-subscribe.component';
import WishlistPage from './pages/wishlist-page/wishlist-page.component';
import SpeakerOpportunityComponent from './pages/speaker-opportunity-page/speaker-opportunity-page.component';

import { checkUserSession } from './redux/user/user.action';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser }  from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { selectCurrentAdmin } from './redux/admin/admin.selector';

const App = ({ checkUserSession, currentuser, currentAdmin }) => {
   
  useEffect(() => {
      window.scrollTo(0,0);
  }, []);
  
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

  // Logout on Inactive user.
  document.addEventListener("mousemove", () =>{ 
    localStorage.setItem('lastActvity', new Date())
  });
  document.addEventListener("click", () =>{ 
    localStorage.setItem('lastActvity', new Date())
  });
  document.addEventListener("wheel", () =>{ 
    localStorage.setItem('lastActvity', new Date())
  });

  let timeInterval = setInterval(() => {
    let lastAcivity = localStorage.getItem('lastActvity')
    var diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
    var seconds = Math.floor((diffMs/1000));
    var minute = Math.floor((seconds/60));
    var currentUrl = window.location.href;
    var checkCurrentUrl = currentUrl.includes('admin');
    var redirectLocation = window.location.origin + '/admin';

    if(minute === 15){
      clearInterval(timeInterval)
      //code for logout or anything...
      if(checkCurrentUrl){
        localStorage.clear();
        window.location.href = redirectLocation;
      }
    }
  
  },1000)
  return (
    // <PayPalScriptProvider options={{'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
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
          <Route exact path = '/admin/discount' component = {DiscountPage}/>
          <Route exact path = '/admin/dashboard' component={AdminDashboard} />
          <Route exact path = '/admin/speaker' component={AdminSpeaker} />
          <Route exact path = '/payment' component = {PaymentPage}/>
          <Route exact path = '/forgot-password' component = {ForgotPasswordComponent}/>
          <Route exact path = '/reset-password' component = {ResetPasswordComponent}/>
          <Route exact path = '/subscribe' component = {SubscribePage}/>
          <Route exact path = '/unsubscribe' component = {SubscribePage}/>
          <Route exact path = '/about' component = {AboutAndContactPage}/>
          <Route exact path = '/contact' component = {AboutAndContactPage}/>
          <Route exact path = '/faq' component = {FaqPage}/>
          <Route exact path = '/speakers' component = {SpeakersPage}/>
          <Route exact path = '/speakers/:id' component = {SpeakerDetailComponent}/>
          <Route exact path = '/admin/subscription' component={AdminSubscribeComponent}/>
          <Route exact path = '/wishlist' component={WishlistPage}/>
          <Route exact path = '/speaker-opportunity' component={SpeakerOpportunityComponent}/>
          <Route exact path='/admin'
            render = {
              () => currentAdmin ? <Redirect to='/admin/dashboard'/> : <AdminLoginPage/>
            }
          />
          <Route exact path='/*' component = {ErrorPage} />
        </Switch>
        <Footer />
      </div>
    // </PayPalScriptProvider>
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
