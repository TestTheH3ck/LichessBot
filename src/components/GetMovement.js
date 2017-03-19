import React from 'react';
import { MultiplyArray, IteratingArray } from './ArrayActions'

export const getMovement = (figure, mult) => {
	switch (figure) {
		case 'knight':
			return [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
		case 'pawn':
			return IteratingArray([[1, -1], [1, 1]], mult);
		case 'bishop':
			return MultiplyArray([[1, 1], [1, -1], [-1, -1], [-1, 1]]);
		case 'rook':
			return MultiplyArray([[1, 0], [-1, 0], [0, -1], [0, 1]]);
		case 'queen':
			return MultiplyArray([[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]]);
		case 'king':
			return [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]]
	}
}

