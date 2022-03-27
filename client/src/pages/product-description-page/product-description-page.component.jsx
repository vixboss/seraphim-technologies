import React, { useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { fetchCollectionsStart, fetchItemDescription } from './../../redux/shop/shop.actions';
import { selectCollectionForProductDescription, selectCollections } from './../../redux/shop/shop.selector';
import ProductDescriptionContainer  from './../../components/product-description/product-description.conatiner';

import './product-description-page.styles.scss';

const ProductDescriptionPage = ({collectionItemDetails, collections, fetchCollectionsStart, fetchItemDescription}) => {
    const path = window.location.pathname.split('/');
    const category = path[2].replace(/-+/g, ' ').toLowerCase();
    const product = path[3].replace(/-+/g, ' ').toLowerCase();
   
    if(typeof(collectionItemDetails) !== "undefined"){
        localStorage.setItem('collectionItemDetails', JSON.stringify(collectionItemDetails[0]));
    }
    const itemDetails = JSON.parse((localStorage.getItem('collectionItemDetails') !== "undefined" ? localStorage.getItem('collectionItemDetails') : "[]") || "[]");

    var objLength = 1; 
    if(typeof collectionItemDetails !== "undefined" && collectionItemDetails !== null){
        objLength = Object.keys(collectionItemDetails).length;
    }

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    useEffect(() => {
        fetchItemDescription({category, product})
    }, [collections]);
    return ( 
        <div className="product-description-page">
        {
            typeof(collectionItemDetails) !== "undefined" && objLength !== 0 ?
                <ProductDescriptionContainer id={collectionItemDetails[0].id} collectionItem = {collectionItemDetails[0]}/> : <ProductDescriptionContainer id={itemDetails.id} collectionItem = {itemDetails}/>
        }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    collectionItemDetails: selectCollectionForProductDescription,
    collections: selectCollections
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
    fetchItemDescription: collectionState => dispatch(fetchItemDescription(collectionState))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPage);