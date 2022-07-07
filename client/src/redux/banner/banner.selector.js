import { createSelector } from "reselect";

const selectBanner = state => state.banner;

export const selectBannerType = createSelector([selectBanner], (banner)=> banner.bannerTitle ? banner.bannerTitle.bannerArray : []);

export const selectIsBannerFetching = createSelector(
    [selectBanner],
    banner=> banner.isFetching
);

export const selectResponseData = createSelector(
    [selectBanner],
    banner => banner.bannerTitle.responseData
);

export const selectBannerById = createSelector(
    [selectBanner],
    banner => banner.bannerTitle.bannerById
)