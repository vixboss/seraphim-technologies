// import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const searchCollectionsStart = (data) => ({
    type: ShopActionTypes.SEARCH_COLLECTIONS_START,
    payload: data
})

export const searchCollectionsSuccess = (collectionsMap) => ({
    type:ShopActionTypes.SEARCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const searchCollectionsFailure = (errorMessage) => ({
    type:ShopActionTypes.SEARCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchItemDescription = (selectedItem) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS,
    payload: selectedItem
});


// export const fetchItemDescriptionStart = () => ({
//     type: ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_START
// })

// export const fetchItemDescriptionSuccess = (selectedItem) => ({
//     type: ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_SUCCESS,
//     payload: selectedItem
// });

// export const fetchItemDescriptionFailure = (errorMessage) => ({
//     type: ShopActionTypes.FETCH_COLLECTIONS_ITEM_DETAILS_FAILURE,
//     payload: errorMessage
// })

// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());

//         collectionRef.get().then(snapshot =>{
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//             dispatch(fetchCollectionsSuccess(collectionsMap));
//         }).catch(error => {
//             dispatch(fetchCollectionsFailure(error.message));
//         });
//     }
// }
