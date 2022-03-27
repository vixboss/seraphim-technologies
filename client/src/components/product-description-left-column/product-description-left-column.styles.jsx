import styled from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

export const AddButton = styled(CustomButton)`
  width: 30%;
  opacity: 0.7;
  /* position: absolute; */
  top: 255px;
  margin-top: 5px;

  @media screen and (max-width: 800px) {
    /* display: block;
    opacity: 0.9;
    min-width: unset;
    padding: 0 10px;
    font-size: small;
    width: auto;
  }  */
`;