import { FETCH_BOARD } from '../actions/types'

const INITIAL_STATE = [];

export default function (state=INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_BOARD:
      return action.payload;
    default:
      return state;
  }
}