import { IS_FETCHING_MORTGAGE_INFO } from '../constants/actionTypes';

const initialState = {
  isFetchingMortgageInfo: false,
};

function utilsReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING_MORTGAGE_INFO:
      return Object.assign({}, state, {
        ...state,
        isFetchingMortgageInfo: action.payload,
      });
    default:
      return state;
  }
}
export default utilsReducer;
