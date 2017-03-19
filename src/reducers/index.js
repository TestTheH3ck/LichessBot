import { combineReducers } from 'redux';
import MessageReducer from './reducer-messages';
import NameReducer from './reducer-name';
import ChessReducer from './chess-reducer'
import ColorReducer from './color-reducer'
import LinkReducer from './reducer-link'

const rootReducer = combineReducers({
  structure: MessageReducer,
  name: NameReducer,
  board: ChessReducer,
	color: ColorReducer,
	link: LinkReducer
});

export default rootReducer;