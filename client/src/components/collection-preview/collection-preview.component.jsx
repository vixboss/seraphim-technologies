import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ categoryId, title, items, history, match, routeName }) => (
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
    <CollectionItem key={items.id} item={items} title={title} categoryId= {categoryId} productId= {items.id}/>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);