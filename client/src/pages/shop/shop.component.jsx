import React, { useEffect } from "react";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

const ShopPage = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {

        fetchCollectionsStart();

        // const { updateCollections } = this.props;
        // const collectionRef = firestore.collection('collections');

        /***************************/
        /*Another way to fetch data*/
        /***************************/

        // this.unSubscribeFromSnapshot = collectionRef.onSnapshot(snapshot =>{
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({
        //         loading: false
        //     });
        // });

        /*************************/
        /* Next way to fetch data*/
        /*************************/

        // By using Promise()

        // collectionRef.get().then(snapshot =>{
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //         updateCollections(collectionsMap);
        //         this.setState({
        //             loading: false
        //         });
        //     }
        // );

        /*************************/
        /* Next way to fetch data*/
        /*************************/

        // By using fetch();

        // fetch('https://firestore.googleapis.com/v1/projects/seraphim-db/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));


        /*******************************/
        //Fetching collections using redux-thunk from redux library..
        //From shop.Action.js and shop.reducer.js and shop.types.js
        /******************************/
    }, [fetchCollectionsStart]);


    return ( 
        <div className = 'shop-page page-border-thin' >
            <Route exact path = { `${match.path}` } component = { CollectionsOverviewContainer }/> 
            <Route path = { `${match.path}/:collectionId` } component = { CollectionPageContainer }/> 
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});


export default connect(null, mapDispatchToProps)(ShopPage);