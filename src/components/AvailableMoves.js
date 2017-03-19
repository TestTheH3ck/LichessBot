import React from 'react';
import validationMove from './ValidationMove'
import { getMovement } from './GetMovement'

const moveAvailable = (figure, index, board, color) => {

	var figure = board[index[0]][index[1]].type;
	var mult = 1;
	color === 'black' ? mult = -1 : '';
	var moves;

	var availMoves = () => {
		switch (figure) {
			case 'Pawn':
				moves = IteratingArray([[-1, 0]], mult);
				const movesIf = IteratingArray([[-2][0]], mult);
				const atackLines = getMovement(figure, mult);
				var el;
				var availMove;
				atackLines.map((move) => {
					el = board[index[0] + move[0]][index[1] + move[1]] || '';
					el && el.color !== color && el.color !== '' && moves.push([index[0] + move[0], index[1] + move[1]])
				});
				availMove = this.validationMove(index, moves, true, board, color);

				return availMove;

			case 'Knight':
				moves = getMovement(figure);
				availMove = this.validationMove(index, moves, false, board, color);

				return availMove;
			case 'Bishop':
				moves = getMovement(figure);
				availMove = this.validationMove(index, moves, 'diag', board, color);

				return availMove;
			case 'Elephant':
				moves = getMovement(figure) ;
				availMove = this.validationMove(index, moves, 'diag', board, color);

				return availMove;
			case 'Queen':
				moves = getMovement(figure);
				availMove = this.validationMove(index, moves, 'diag', board, color);

				return availMove;
			case 'King':
				moves = getMovement(figure);
				availMove = this.validationMove(index, moves, false, board, color);

				return availMove;
		}
	};
	return availMoves()
}

export default moveAvailable