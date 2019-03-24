import { baseURL } from '../constants/utils';
import { GET_PROPERTY_MORTGAGE_INFO } from '../constants/actionTypes';
import { isFetchingMortgageInfo } from './utils';

export const getPropertyMortgageInfo = mortgageID => dispatch => {
  isFetchingMortgageInfo(true);
  return fetch(`${baseURL}/${mortgageID}`)
    .then(res => {
      return res.json();
    })
    .then(json =>
      dispatch({
        type: GET_PROPERTY_MORTGAGE_INFO,
        payload: json,
      }),
    )
    .catch(err => console.error('Failed to fetch all categories', err))
    .then(() => isFetchingMortgageInfo(true));
};
