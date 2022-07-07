import BannerActionType from './banner.types.js';

export const getAllBannerStart = () => ({
    type: BannerActionType.BANNER_GET_START
});

export const getAllBannerSuccess = (bannerTitle) =>({
    type: BannerActionType.BANNER_GET_SUCCESS,
    payload: bannerTitle
});

export const getAllBannerFailure = (error) => ({
    type: BannerActionType.BANNER_GET_FAILURE,
    payload: error
});

export const addBannerStart = title => ({
    type: BannerActionType.BANNER_ADD_START,
    payload: title
});

export const addBannerSuccess = bannerTitle => ({
    type: BannerActionType.BANNER_ADD_SUCCESS,
    payload: bannerTitle
});

export const addBannerFailure = error => ({
    type: BannerActionType.BANNER_ADD_FAILURE,
    payload: error
})

export const updateBannerStart = data => ({
    type: BannerActionType.BANNER_UPDATE_START,
    payload: data
})

export const updateBannerSuccess = data => ({
    type: BannerActionType.BANNER_UPDATE_SUCCESS,
    payload: data
})

export const updateBannerFailure = error => ({
    type: BannerActionType.BANNER_UPDATE_FAILURE,
    payload: error
})

export const deleteBannerStart = data => ({
    type: BannerActionType.BANNER_DELETE_START,
    payload: data
})

export const deleteBannerSuccess = data => ({
    type: BannerActionType.BANNER_DELETE_SUCCESS,
    payload: data
})

export const deleteBannerFailure = error => ({
    type: BannerActionType.BANNER_DELETE_FAILURE,
    payload: error
})