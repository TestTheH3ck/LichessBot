import React from 'react';
import elValid from './ElementValid'

const validationMove = (index, moves, condition=false, board, color) => {

	var expectedMoves = [];
	var realel;
	var realels;

	for (var move of moves) {
		if (condition === 'diag') {
			for (var el of move) {
				realels = this.elValid(el, index, board, color);
				if (realels) {
					realel = board[realels[0]][realels[1]];
				} else {
					break
				}
				if (realel) {
					if (realel.color === color) {
						break;
					} else if (realel.color !== '') {
						expectedMoves.push(realels);
						break;
					} else {
						expectedMoves.push(realels);
					}
				}
			}
		} else {
			realels = this.elValid(move, index, board, color, condition);
			realels && expectedMoves.push(realels);
		}
	}

	return expectedMoves
}