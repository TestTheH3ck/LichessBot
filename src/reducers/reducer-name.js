import { FETCH_NAME } from '../actions/types';

const INITIAL_STATE = [];

export default function (state=INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_NAME:
      return [...state, action.payload];
    default:
      return state;
  }
}