import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Moment from 'moment';

// import CollectionItem from '../../components/collection-item/collection-item.component';
import MenuCardContainer from "../../components/menu-card/menu-card.container";
import { selectCollection } from "../../redux/shop/shop.selector";
import './collection.styles.scss';

const CollectionPage = ({collection}) => {
    let {items, title} = collection;
    items = items.sort((a,b) => new Moment(a.date).format('X') - new Moment(b.date).format('X')).reverse();

    return(
        <div className='collection-page'>
            <h2 className='title'>{title.toUpperCase()}</h2>
            <Row md={4} xs={2}>
                {/*
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} title={title} categoryId= {collection.id} productId= {item.id}/>
                    ))
                */}
                <MenuCardContainer item= {items}/>
            </Row>
        </div>
    )
}
const mapStateToProps = (state, ownProps) =>({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);