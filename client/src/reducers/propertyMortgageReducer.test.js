import reducer from './propertyMortgageReducer';
import * as types from '../constants/actionTypes';

describe('Category Reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('Should handle GET_PROPERTY_MORTGAGE_INFO', () => {
    expect(
      reducer([], {
        type: types.GET_PROPERTY_MORTGAGE_INFO,
        payload: { name: 'foo', address: 'bar' },
      }),
    ).toEqual({ name: 'foo', address: 'bar' });
  });
});
