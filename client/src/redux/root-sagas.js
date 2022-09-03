import { all, call } from "@redux-saga/core/effects";

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';
import { AdminSaga } from './admin/admin.sagas';
import { ProductSaga } from './product/product.saga';
import { MerchandiseSaga } from './merchandise/merchandise.saga';
import { UserPurchaseSaga } from "./user-purchase/user-purchase.sagas";
import { UserPurchaseListSaga } from './user-purchase-list/user-purchase-list.saga';
import { DiscountSaga } from './discount/discount.saga';
import { BannerSaga } from './banner/banner.saga';
import { PaypalNotificationMailSaga } from './paypalPaymentNitificationMail/paypalPaymentNitificationMail.saga';
import { SpeakerSaga } from "./speaker/speaker.saga";
import { SubscriptionSaga } from './subscription/subscription.saga';
import { WishlistSaga } from "./wishlist/wishlist.saga";
import { SpeakerOpportunitySaga } from './speaker-opportunity/speaker-opportunity.saga';

export default function* rootSagas() {
    yield all([
       call(shopSagas),
       call(userSagas),
       call(cartSagas),
       call(AdminSaga),
       call(ProductSaga),
       call(MerchandiseSaga),
       call(UserPurchaseSaga),
       call(UserPurchaseListSaga),
       call(DiscountSaga),
       call(BannerSaga),
       call(PaypalNotificationMailSaga),
       call(SpeakerSaga),
       call(SubscriptionSaga),
       call(WishlistSaga),
       call(SpeakerOpportunitySaga)
    ]);
}