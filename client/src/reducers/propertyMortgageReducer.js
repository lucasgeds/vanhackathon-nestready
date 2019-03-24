import { GET_PROPERTY_MORTGAGE_INFO } from '../constants/actionTypes';

const initialState = {};

function propertyMortgageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTY_MORTGAGE_INFO:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
export default propertyMortgageReducer;
