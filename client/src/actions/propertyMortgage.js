import { baseURL } from '../constants/utils';
import { GET_PROPERTY_MORTGAGE_INFO } from '../constants/actionTypes';
import { isFetchingMortgageInfo } from './utils';

export const getPropertyMortgageInfo = mortgageID => dispatch => {
  isFetchingMortgageInfo(true);
  /*return fetch(`${baseURL}/${mortgageID}`)
    .then(res => {
      return res.json();
    })
    .then(json =>*/
  dispatch({
    type: GET_PROPERTY_MORTGAGE_INFO,
    payload: {
      borrower: 'Frederick Townes',
      property: "Townes's Home",
      address: '12, rue Sainte-Anne Québec, QC',
      credit_amount: 500000,
      installment_amount: 1750,
      installments_number: 360,
      installments_left: 300,
      interest_percentage: 0.26,
      total_amount: 630000,
    },
  });
  // )
  // .catch(err => console.error('Failed to fetch all mortgage info', err))
  // .then(() => isFetchingMortgageInfo(false));

  isFetchingMortgageInfo(true);
  return null;
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
