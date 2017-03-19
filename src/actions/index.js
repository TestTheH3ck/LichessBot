import { FETCH_MESSAGE, FETCH_NAME, FETCH_BOARD, SET_COLOR, SET_LINK, SET_LASTMOVE, SET_FIRSTMOVE } from './types';

export function fetchMessage(props) {
  return {
    type: FETCH_MESSAGE,
    payload: props
  }
}

export function fetchName(props) {
  return {
    type: FETCH_NAME,
    payload: props
  }
}

export function fetchBoard(props) {
  return {
    type: FETCH_BOARD,
    payload: props
  }
}

export function setColor(props) {
	return {
		type: SET_COLOR,
		payload: props
	}
}

export function setLink(props) {
	return {
		type: SET_LINK,
		payload: props
	}
}

export function setFirstmove(props) {
	return {
		type:	SET_FIRSTMOVE,
		payload: props
	}
}

export function setLastmove(props) {
	return {
		type:	SET_LASTMOVE,
		payload: props
	}
}