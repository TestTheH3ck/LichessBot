import { combineReducers } from 'redux';
import MessageReducer from './reducer-messages';
import NameReducer from './reducer-name';
import ChessReducer from './chess-reducer'

const rootReducer = combineReducers({
  structure: MessageReducer,
  name: NameReducer,
  board: ChessReducer
});

export default rootReducer;