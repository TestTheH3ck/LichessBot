import { SET_LINK } from '../actions/types'

const INITIAL_STATE = '';

export default function (state=INITIAL_STATE, action){
	switch(action.type) {
		case SET_LINK:
			return action.payload;
		default:
			return state;
	}
}