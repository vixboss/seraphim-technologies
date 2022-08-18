import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import adminReducer from './admin/admin.reducer';
import productReducer from './product/product.reducer';
import merchandiseReducer from './merchandise/merchandise.reducer';
import userPurchaseReducer from './user-purchase/user-purchase.reducer';
import userPurchaseListReducer from './user-purchase-list/user-purchase-list.reducer';
import discountReducer from './discount/discount.reducer';
import bannerReducer from './banner/banner.reducer';
import speakerReducer from './speaker/speaker.reducer';
import subscriptionReducer from './subscription/subscription.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer ,
    admin: adminReducer,
    product: productReducer,
    merchandise: merchandiseReducer,
    userPurchase: userPurchaseReducer,
    userPurchaseList: userPurchaseListReducer,
    discount:discountReducer,
    banner: bannerReducer,
    speaker: speakerReducer,
    subscription: subscriptionReducer
});
export default persistReducer(persistConfig, rootReducer);