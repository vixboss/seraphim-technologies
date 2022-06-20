import React from 'react';
import parse from 'html-react-parser';

import { checkUndefined, paragraphToList } from '../../factory';
import { Row, Col } from 'react-bootstrap';

import './product-configuration.styles.scss';
import { useEffect } from 'react';

const ProductConfiguration = ({description, speakerName, date, duration, detailFieldTxtArea, industry}) => {
    const details = detailFieldTxtArea;
    // const checkedData = checkUndefined(productConfiguration);
    description = checkUndefined(description);
    date = checkUndefined(date);
    speakerName = checkUndefined(speakerName);
    industry = checkUndefined(industry);
    // let description = '';
    let detailFields = '';
    let detailFieldsHeading = '';
    let detailFieldsContent= '';

    // if(checkedData){
    //     console.log(checkedData);
    //     description = checkedData.description; 
    //     detailFields = checkedData.detailFields;
    //     detailFieldsHeading = Object.keys(detailFields).reverse();
    //     detailFieldsContent = detailFieldsHeading.map(index => detailFields[index] );
    // }
    
    const list = paragraphToList(detailFieldsContent); 
    return(
        <div className='product-configuration'>
            <Row>
                <Col md= {6}>
                    <Row>
                        <Col md = {4}>
                            <span className='heading-size'>{speakerName ? "Speaker Name:-" : ''}</span>
                        </Col>
                        <Col md = {8}>
                            <p style = {{ fontSize: '18px'}}>{speakerName}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md= {6}>
                    <Row>
                        <Col md = {4}>
                            <span className='heading-size'>{industry ? "Industry:-" : ''}</span>
                        </Col>
                        <Col md = {8}>
                            <p style = {{ fontSize: '18px'}}>{industry}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md= {6}>
                    <Row>
                        <Col md = {4}>
                            <span className='heading-size'>{duration ? "Duration:-" : ''}</span>
                        </Col>
                        <Col md = {8}>
                            <p style = {{ fontSize: '18px'}}>{duration + ' minutes'}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md= {6}>
                    <Row>
                        <Col md = {4}>
                            <span className='heading-size'>{date ? "Date:-" : ''}</span>
                        </Col>
                        <Col md = {8}>
                            <p style = {{ fontSize: '18px'}}>{date.convertToDate()}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
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