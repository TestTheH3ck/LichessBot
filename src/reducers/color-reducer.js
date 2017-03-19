import { SET_COLOR, SET_LINK } from '../actions/types'

const INITIAL_STATE = '';

export default function (state=INITIAL_STATE, action){
	switch(action.type) {
		case SET_COLOR:
			return action.payload;
		default:
			return state;
	}
}