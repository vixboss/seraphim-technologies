import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { fetchItemDescription } from './../../redux/shop/shop.actions';


import './menu-card.styles.scss';

const MenuCard = ({item, history, fetchItemDescription }) => {
    
    return(
        <>
            {
                item.map((itm, idx) => {
                    const category = itm.title;
                    const product = itm.name;

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
                            >
                                <Card.Img variant="top" src={itm.imageUrl} width="180px" height="160px"/>
                                <Card.Body>
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
                                        </span>
                                    </Card.Text>
                                    <Row>
                                        <Button variant="secondary" className="btn-text-size"
                                        onClick = {() => {
                                            history.push(`/shop/${itm.title.replace(/\s+/g, '-').toLowerCase()}/${itm.name.replace(/\s+/g, '-').toLowerCase()}`, {category, product})
                                        }}
                                        >Know More...</Button>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                )
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchItemDescription: collectionState => dispatch(fetchItemDescription(collectionState))
});
export default withRouter(connect(null, mapDispatchToProps)(MenuCard));