import React from 'react';
import parse from 'html-react-parser';

import { checkUndefined, paragraphToList } from '../../factory';

import './product-configuration.styles.scss';
import { useEffect } from 'react';

const ProductConfiguration = ({productConfiguration, detailFieldTxtArea}) => {
    const details = detailFieldTxtArea;
    const checkedData = checkUndefined(productConfiguration);
    let description = '';
    let detailFields = '';
    let detailFieldsHeading = '';
    let detailFieldsContent= '';

    if(checkedData){
        description = checkedData.description; 
        detailFields = checkedData.detailFields;
        detailFieldsHeading = Object.keys(detailFields).reverse();
        detailFieldsContent = detailFieldsHeading.map(index => detailFields[index] );
    }
    
    const list = paragraphToList(detailFieldsContent); 
    return(
        <div className='product-configuration'>
            <span className='heading-size'> { description ? 'Description:-' : '' } </span>
            <p align="justify">{ description }</p>
            {   
                // detailFieldsHeading ?
                // detailFieldsHeading.map((heading, index) => {
                //     const arrayOfList = list[index];
                //     return (
                //         <div key={index} className="detail-fields">
                //             <span className="detail-field-heading heading-size">
                //                 { heading }
                //             </span>
                //             {   
                //                 typeof arrayOfList !== "undefined" ? 
                //                 arrayOfList.map((listOfDetail, ind) => {
                //                     const htmlObject = React.createElement('li',{id:'index_' + index }, listOfDetail);

                //                     return(
                //                         React.createElement("ul",{ key:"key_of_list_" + ind, className: 'detail-field-list', align: "justify"}, htmlObject)
                //                     )
                //                 })
                //                 : 
                //                 null
                //             }
                //         </div>
                //     )
                // }) : ''

                parse('<div className = "detail-field-style">' +  details  + '</div>')
            }
        </div>
    );
}

export default ProductConfiguration;