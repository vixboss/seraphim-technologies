import React from "react";
import { withRouter } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import ProductConfiguration from "../product-configuration/product-configuration.component";
import ProductDescriptionLeftColumn from '../product-description-left-column/product-description-left-column.component';

import './product-description.styles.scss';

const ProductDescription = ({collectionItem, history, match }) => {
    const {id, name, description, heading, speakerName, date, duration, detailFieldTxtArea} = collectionItem;
    return (
        // <div className="product-description-page">
        //     {/* Left Column / Headphones Image */}
        //     <div className="left-column">
        //         <ProductDescriptionLeftColumn id= {id} item = {collectionItem}/>
        //     </div>

        //     {/* Right Column */}
        //     <div className="right-column">

        //         {/* Product Description */}
        //         <div className="product-description">
        //             <span>{match.params.id.toUpperCase()}</span>
        //             <h1>{name}</h1>
        //             <p>{heading}</p>
        //         </div>

        //         {/* Product Configuration */}
        //         <ProductConfiguration productConfiguration={productDescription}/>
        //     </div>
        // </div>
            <Grid className="box-padding" container spacing={3}>
                <Grid item md={4}>
                    <ProductDescriptionLeftColumn id= {id} item = {collectionItem} name = {name} date = {date}/>
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
                    />
                </Grid>
            </Grid>
    )
};

export default withRouter(ProductDescription);