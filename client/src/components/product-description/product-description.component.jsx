import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { dateDifferenceInEST } from '../../factory';
import { selectProductByName, selectProductById } from './../../redux/product/product.selector';
import ProductConfiguration from "../product-configuration/product-configuration.component";
import ProductDescriptionLeftColumn from '../product-description-left-column/product-description-left-column.component';
import OfferRibbonComponent from '../offer-ribbon/offer-ribbon.component';

import './product-description.styles.scss';

const ProductDescription = ({history, match, selectProductByName, selectProductById }) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const [collectionItem, setCollectionItem] = useState({
        id: '', 
        name: '',
        description: '',
        speakerName: '',
        date: '',
        duration: '',
        detailFieldTxtArea: '' 
    });

    // useEffect(() => {
    //     if(typeof selectProductByName.length === "undefined" && selectProductByName.length !== 0){
    //         setCollectionItem(selectProductByName.data[0]);
    //     }
    // }, [selectProductByName]);

    useEffect(() => {
        if(typeof selectProductById.length === "undefined" && selectProductById.length !== 0){
            setCollectionItem(selectProductById.data[0]);
        }
    }, [selectProductById]);

    // console.log(collectionItem);
    const {id, name, description, speakerName, date, duration, detailFieldTxtArea, time } = collectionItem;
    const days = dateDifferenceInEST(date.convertToDate());
    
    return (
          
            <Grid className="box-padding" container spacing={3}>
                <Grid item xs = {12} md = {12} style = {{paddingTop: '0px'}}>
                    <OfferRibbonComponent/>
                </Grid>
                <Grid item md={4}>
                    <ProductDescriptionLeftColumn id= {id} item = {collectionItem} name = {name} date = {date} days = {days}/>
                </Grid>
                <Grid item md={8}>
                    <div className="product-description">
                        <h1 style={{textAlign: 'center'}}>{name}</h1>
                    </div>
                    <ProductConfiguration 
                        description={description} 
                        detailFieldTxtArea = {detailFieldTxtArea}
                        date = {date}
                        duration = {duration}
                        speakerName = { speakerName }
                        industry = {match.params.id.toUpperCase()}
                        time = {time}
                        days = {days}
                    />
                </Grid>
            </Grid>
    )
};

const mapStateToProps = createStructuredSelector({
    selectProductByName: selectProductByName,
    selectProductById: selectProductById
});

export default withRouter(connect(mapStateToProps)(ProductDescription));