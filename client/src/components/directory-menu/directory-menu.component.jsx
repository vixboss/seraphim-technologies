import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Row, Badge } from 'react-bootstrap';
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Moment from 'moment';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import MenuCardContainer from "../menu-card/menu-card.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { srvTimeEst, filterWebinar } from "../../factory";
import './directory-menu.styles.scss';

const DirectoryMenu = ({fetchCollectionsStart, collections, history}) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
    const [recordedItemArray, setRecordedItemArray] = useState([]);
    const [upcomingItemArray, setUpcomingItemArray] = useState([]);
    useEffect(() => {
        var upcoming = [];
        var recorded = [];
        var currentDate = srvTimeEst();

        collections.forEach((collection) => {
            const categoryId = collection.id;
            collection.items.forEach((item) => {
                var arr = filterWebinar(currentDate, item.date, item.time, item.duration);
                if(arr === 'recorded'){
                    recorded.push({...item, categoryId})
                }
                else{
                    upcoming.push({...item, categoryId})
                }
            });
        });

        upcoming = upcoming.sort((a,b) => new Moment(a.date).format('X') - new Moment(b.date).format('X'));
        recorded = recorded.sort((a,b) => new Moment(a.date).format('X') - new Moment(b.date).format('X')).reverse();

        setRecordedItemArray(recorded.slice(0,4));
        setUpcomingItemArray(upcoming.slice(0,4));

    }, [collections]);

    return(
        <>     
            <h3 className="upcoming-webinars home-page-border">
                <Badge pill bg={false}>{'Upcoming Webinars: '}</Badge>
            </h3>
            <Row md={4} className="directory-menu g-4 home-page-border">
                <MenuCardContainer item = {upcomingItemArray} type= {'Upcoming'}/>
            </Row>
            {
                upcomingItemArray.length > 0 &&
                <Row className = "clickable-button">
                    <Chip label="View More..." onClick = {() => history.push({pathname:'/shop',state: {type: 'upcoming'}})}/>
                </Row>
            }
            <h3 className="recorded-webinars onHover home-page-border">
                <Badge pill bg="secondary">
                    <Link to='/shop'>
                        {'Recorded Webinars: '}
                    </Link>
            </Badge>
            </h3>
            <Row md={4} className="directory-menu g-4 home-page-border">
                <MenuCardContainer item = {recordedItemArray} type= {'Recorded'}/>
            </Row>
            {
                recordedItemArray.length > 0 &&
                <Row className = "clickable-button">
                    <Chip label="View More..." onClick = {() => history.push({pathname: '/shop', state: {type: 'recorded'}})}/>
                </Row>
            }
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DirectoryMenu));