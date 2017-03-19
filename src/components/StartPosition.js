import React from 'react';

export const startPosition = () => {
	let board = new Array(8);
	for (let i = 0; i < 8; i++) {
		board[i] = new Array(8);
	}
	for (let a = 0; a < 8; a++) {
		for (let b = 0; b < 8; b++) {
			board[a][b] = { type: 'Empty', color: '' }
		}
	}
	for (let i = 0; i < 8; i++) {
		board[1][i] = { type: 'pawn', color: 'black'};
		board[6][i] = { type: 'pawn', color: 'white' };
	}
	// Knights assigment
	board[0][1] = { type: 'knight', color: 'black' };
	board[0][6] = { type: 'knight', color: 'black' };
	board[7][1] = { type: 'knight', color: 'white' };
	board[7][6] = { type: 'knight', color: 'white' };
	// Bishops

	board[0][2] = { type: 'bishop', color: 'black' };
	board[0][5] = { type: 'bishop', color: 'black' };
	board[7][2] = { type: 'bishop', color: 'white' };
	board[7][5] = { type: 'bishop', color: 'white' };
	//Elephant

	board[0][0] = { type: 'rook', color: 'black' };
	board[0][7] = { type: 'rook', color: 'black' };
	board[7][0] = { type: 'rook', color: 'white' };
	board[7][7] = { type: 'rook', color: 'white' };

	board[7][3] = { type: 'queen', color: 'white' };
	board[0][3] = { type: 'queen', color: 'black' };

	board[7][4] = { type: 'king', color: 'white' };
	board[0][4] = { type: 'king', color: 'black' };

	return board;
}