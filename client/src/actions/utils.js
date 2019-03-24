import { IS_FETCHING_MORTGAGE_INFO } from '../constants/actionTypes';

export const isFetchingMortgageInfo = isFething => dispatch => {
  dispatch({
    type: IS_FETCHING_MORTGAGE_INFO,
    payload: isFething,
  });
};
