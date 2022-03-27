import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { addItem } from './../../redux/cart/cart.action';
import { fetchItemDescription } from './../../redux/shop/shop.actions';
import MenuCardContainer from './../menu-card/menu-card.container';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from './collection-item.styles';

const CollectionItem = ({ categoryId, productId , item, title, addItem, history, match, fetchItemDescription }) => {
  const { name, price, imageUrl } = item;
  const itemDescription = {
    categoryId,
    productId
  }
  return (
    <Row md={4} xs={2}>
     {/*<CollectionItemContainer style= {{cursor: 'pointer'}}>
     <BackgroundImage 
        className='image' 
        imageUrl={imageUrl} 
        onClick={() => {
          history.push(`${title ? (match.url.split('/').length < 3 ? match.url : '/shop') + '/' + title.replace(/\s+/g, '-').toLowerCase(): match.url}/${name.replace(/\s+/g, '-').toLowerCase()}`, {categoryId, productId} );
        }}

        >
      </BackgroundImage>
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{'$'+price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>*/}
    
      <MenuCardContainer item = {item.slice(0,4)}/>
    </Row>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  fetchItemDescription: collectionState => dispatch(fetchItemDescription(collectionState))
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CollectionItem));