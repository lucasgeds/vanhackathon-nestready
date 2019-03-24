import { combineReducers } from 'redux';
import propertyMortgageReducer from './propertyMortgageReducer';
import utilsReducer from './utilsReducer';

export const Reducers = combineReducers({
  propertyMortgage: propertyMortgageReducer,
  utils: utilsReducer,
});

export default Reducers;
