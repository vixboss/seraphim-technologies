import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { fetchItemDescription } from './../../redux/shop/shop.actions';
import { dateDifferenceInEST } from './../../factory.js'

import './menu-card.styles.scss';

const MenuCard = ({item, history, fetchItemDescription, type }) => {
    console.log(item);
    return(
        <>
            {
                item.length != 0 ? item.map((itm, idx) => {
                    const category = itm.title;
                    const product = itm.name;
                    const id = itm._id;

                    const itemIds = {
                        category,
                        product
                    };
                    return (
                        <Col
                        key={idx}>
                            <Card
                                bg="light"
                                className="mb-4 mt-2"
                                style = {{ minHeight: '380px'}}
                            >
                                <Card.Img variant="top" src={itm.imageUrl} width="180px" height="160px"/>
                                <Card.Body style = {{ display: 'flex', flexDirection: 'column'}}>
                                    <Card.Title>{itm.name}</Card.Title>
                                    <Card.Text>
                                        <span>
                                            <i className='fa fa-comments'></i> &nbsp;  
                                            {itm.title}
                                            &#8195;
                                            <i className='fa fa-clock-o'></i> &nbsp;  
                                            {itm.duration} Minutes
                                        </span><br/>
                                        <span>
                                            <i className='fa fa-calendar'></i> &nbsp;  
                                            {itm.date.convertToDate()} &nbsp; | &nbsp; {itm.time.convertToTime()} EST
                                        </span><br/>
                                        {

                                            type === 'Upcoming' && 
                                            <span className = "span-align">
                                                {
                                                    dateDifferenceInEST(itm.date.convertToDate())
                                                }
                                            </span>
                                        }
                                    </Card.Text>
                                    <Row style = {{ justifyContent: 'center', marginTop: 'auto'}}>
                                        {/*<Button variant="secondary" className="btn-text-size"
                                        onClick = {() => {
                                            history.push(`/shop/${itm.title.replace(/\s+/g, '-').toLowerCase()}/${itm.name.replace(/\s+/g, '-').toLowerCase()}?queryId=${id}`, {category, product, id})
                                        }}
                                    >Know More...</Button> */}
                                        <Button 
                                            variant="secondary" 
                                            className="btn-text-size"
                                            onClick = {() => {
                                                history.push(`/shop/${itm.title.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'').toLowerCase()}/${itm.name.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'').toLowerCase()}?queryId=${id}`, {category, product, id})
                                            }}
                                        >Know More...</Button>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                ) 
                : 
                
                <Col xs={12} md={12}>
                    <h3 className='animate-charcter' style={{ display: 'flex', justifyContent: 'center' }}>No {type} Webinar...</h3>
                </Col>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchItemDescription: collectionState => dispatch(fetchItemDescription(collectionState))
});
export default withRouter(connect(null, mapDispatchToProps)(MenuCard));