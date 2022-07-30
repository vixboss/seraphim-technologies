import React from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ categoryId, title, items, history, match, routeName, location }) => {
  if(typeof location.state !== "undefined"){
    items = location.state.type === 'upcoming' ? items.sort((a,b) => new Moment(a.date).format('X') - new Moment(b.date).format('X')).reverse():items.sort((a,b) => new Moment(a.date).format('X') - new Moment(b.date).format('X'));
  }
  return (
    <CollectionPreviewContainer>
      <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
        {title.toUpperCase()}
      </TitleContainer>
      {/*<PreviewContainer>
        {
          items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} title={title} categoryId= {categoryId} productId= {item.id}/>
            ))
          }
        </PreviewContainer>*/}
      <CollectionItem key={items.id} item={items} title={title} categoryId= {categoryId} productId= {items.id} routeName = {routeName}/>
    </CollectionPreviewContainer>
)};

export default withRouter(CollectionPreview);