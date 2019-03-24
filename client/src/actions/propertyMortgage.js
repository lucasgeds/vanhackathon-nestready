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
    .catch(err => console.error('Failed to fetch all mortgage info', err))
    .then(() => isFetchingMortgageInfo(true));
};

export const postPropertyMortgageChange = (mortgageID, body) => dispatch => {
  isFetchingMortgageInfo(true);
  return fetch(`${baseURL}/${mortgageID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(res => {
      return res.json();
    })
    .then(json =>
      dispatch({
        type: GET_PROPERTY_MORTGAGE_INFO,
        payload: json,
      }),
    )
    .catch(err => console.error('Failed to fetch all mortgage info', err))
    .then(() => isFetchingMortgageInfo(true));
};
