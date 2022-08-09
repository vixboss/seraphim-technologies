import React, { useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

// import { fetchCollectionsStart, fetchItemDescription } from './../../redux/shop/shop.actions';
import {getProductByNameStart, getProductByIdStart} from './../../redux/product/product.action';
// import { selectCollectionForProductDescription, selectCollections } from './../../redux/shop/shop.selector';
import { selectProductByName } from './../../redux/product/product.selector';
import ProductDescriptionContainer  from '../../components/product-description/product-description.container';

import './product-description-page.styles.scss';

const ProductDescriptionPage = ({getProductByNameStart, selectProductByName, getProductByIdStart}) => {
    const path = window.location.pathname.split('/');
    const category = path[2].replace(/-+/g, ' ').toLowerCase();
    const product = path[3].replace(/-+/g, ' ').toLowerCase();

    const queryId = window.location.search.split('=')[1];
    // console.log(queryId);
   
    // if(typeof(collectionItemDetails) !== "undefined"){
    //     localStorage.setItem('collectionItemDetails', JSON.stringify(collectionItemDetails[0]));
    // }
    // const itemDetails = JSON.parse((localStorage.getItem('collectionItemDetails') !== "undefined" ? localStorage.getItem('collectionItemDetails') : "[]") || "[]");

    // var objLength = 1; 
    // if(typeof collectionItemDetails !== "undefined" && collectionItemDetails !== null){
    //     objLength = Object.keys(collectionItemDetails).length;
    // }
    // useEffect(() => {
    //     getProductByNameStart(product);
    // }, [getProductByNameStart]);

    useEffect(() => {
        getProductByIdStart(queryId);
    }, [getProductByIdStart]);

    // useEffect(() => {
    //     fetchCollectionsStart();
    // }, [fetchCollectionsStart]);

    // useEffect(() => {
    //     fetchItemDescription({category, product})
    // }, [collections]);
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return ( 
        <div className="product-description-page">
        {
            // typeof(collectionItemDetails) !== "undefined" && objLength !== 0 ?
            //     <ProductDescriptionContainer id={collectionItemDetails[0].id} collectionItem = {collectionItemDetails[0]}/> : <ProductDescriptionContainer id={itemDetails.id} collectionItem = {itemDetails}/>

                <ProductDescriptionContainer/> 
            
        }
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    // collectionItemDetails: selectCollectionForProductDescription,
    // collections: selectCollections
    selectProductByName: selectProductByName
});

const mapDispatchToProps = dispatch => ({
    // fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
    // fetchItemDescription: collectionState => dispatch(fetchItemDescription(collectionState))
    getProductByNameStart: (name) => dispatch(getProductByNameStart(name)),
    getProductByIdStart: (id) => dispatch(getProductByIdStart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPage);