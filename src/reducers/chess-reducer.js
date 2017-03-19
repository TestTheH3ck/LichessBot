import { FETCH_BOARD, SET_LASTMOVE, SET_FIRSTMOVE} from '../actions/types'

const INITIAL_STATE = [];

export default function (state=INITIAL_STATE, action){
  switch(action.type) {
		case FETCH_BOARD:
      return Object.assign({}, state, {
			board: action.payload
		});
		case SET_LASTMOVE:
			return Object.assign({}, state, {
				lastmove: action.payload
			});
		case SET_FIRSTMOVE:
			return Object.assign({}, state, {
				firstmove: action.payload
			});

		default:
      return state;
  }
}