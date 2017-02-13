import { FETCH_MESSAGE } from '../actions/types';

const INITIAL_STATE = [{user: 'SYSTEM', message: 'WELCOME'}] ;

export default function (state=INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_MESSAGE:
      return [...state, action.payload]
    default:
      return state;
  }
}