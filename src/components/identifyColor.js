import React from 'react';

export const identifyColor = (finalPos, board, altPos, finalColor) => {
	console.log(finalColor, finalPos, 'final color')
	finalColor = board[finalPos[0]][finalPos[1]].color ? board[finalPos[0]][finalPos[1]].color : board[altPos[0]][altPos[1]].color
	finalColor === 'white' ? finalColor = 'black' : finalColor = 'white';
	return finalColor
}