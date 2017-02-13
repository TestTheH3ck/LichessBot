import { FETCH_MESSAGE, FETCH_NAME, FETCH_BOARD } from './types';

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