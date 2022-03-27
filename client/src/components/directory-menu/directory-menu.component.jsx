import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { Row, Badge } from 'react-bootstrap';
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import MenuCardContainer from "../menu-card/menu-card.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { convertDate } from "../../factory";
import './directory-menu.styles.scss';

const DirectoryMenu = ({fetchCollectionsStart, collections}) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
    const [recordedItemArray, setRecordedItemArray] = useState([]);
    const [upcomingItemArray, setUpcomingItemArray] = useState([]);
    useEffect(() => {
        var upcoming = [];
        var recorded = []
        var currentDate = convertDate(new Date());
        collections.forEach((collection) => {
            const categoryId = collection.id;
            collection.items.forEach((item) => {
                var date = new Date(item.date);
                var dt = convertDate(date);
                if(dt > currentDate){
                    upcoming.push({...item, categoryId});
                }
                else if(dt < currentDate){
                    recorded.push({...item, categoryId});
                }
                else{
                    var currDt = new Date().toString();

                    var newDateObj = moment(item.time).add(item.duration, 'm');
                    var newCurrentDateFormat = moment(currDt.convertToTime(), 'h:mm A').format("HH:mm");
                    var newDateFormat = moment(newDateObj.toString().convertToTime(), 'h:mm A').format("HH:mm");

                    if(newDateFormat > newCurrentDateFormat){
                        upcoming.push({...item, categoryId});
                    }
                    else{
                        recorded.push({...item, categoryId});
                    }
                }
            });
        });
        recorded = recorded.sort(function(a,b){
            return a.createdAt.localeCompare(b.createdAt);
        });
        upcoming = upcoming.sort(function(a,b){
            return a.createdAt.localeCompare(b.createdAt);
        });

        

        recorded = recorded.reverse();
        upcoming = upcoming.reverse();



        setRecordedItemArray(recorded.slice(0,4), console.log(recordedItemArray));
        setUpcomingItemArray(upcoming.slice(0,4), console.log(upcomingItemArray));

        // setRecordedItemArray(recorded, console.log(recordedItemArray));
        // setUpcomingItemArray(upcoming, console.log(upcomingItemArray));

    }, [collections]);

    return(
        <>     
            <h3 className="upcoming-webinars home-page-border">
                <Badge pill bg="primary">{'Upcoming Webinars: '}</Badge>
            </h3>
            <Row md={4} className="directory-menu g-4 home-page-border">
                <MenuCardContainer item = {upcomingItemArray}/>
            </Row>
            <h3 className="recorded-webinars onHover home-page-border">
                <Badge pill bg="secondary">
                    <Link to='/shop'>
                        {'Recorded Webinars: '}
                    </Link>
            </Badge>
            </h3>
            <Row md={4} className="directory-menu g-4 home-page-border">
                <MenuCardContainer item = {recordedItemArray}/>
            </Row>
        </>
    );
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(DirectoryMenu);