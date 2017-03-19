import React from 'react';


const elValid = (move, index, board, color, condition = false) => {

	let PositionX = index[0];
	let PositionY = index[1];
	var nextMoveX = PositionX + move[0];
	var nextMoveY = PositionY + move[1];
	var id = true;

	if (nextMoveX > -1 && nextMoveX < 8 && nextMoveY > -1 && nextMoveY < 8) {
		if (this.Moves === true) {
			var asd = this.newBoard([nextMoveX, nextMoveY], board, index, true);
			this.duno = true;
			this.colisionDetect(asd, 'enemy');
			this.duno = false;
		}
		var newEl = board[nextMoveX][nextMoveY];
		/*(condition === true && !newEl.color) && console.log(newEl.color);*/
		if (newEl.type === 'King' && newEl.color !== color) {
			this.check = true
		}
		if (this.check === false || this.duno === true) {
			var cond = (newEl && newEl.color !== color);
			//var expectedEl = expectedMoves.push([nextMoveX, nextMoveY])
			if (condition === true && newEl.type !== 'Empty') return;
			if (newEl.color !== color) return [nextMoveX, nextMoveY];
			/*newEl && newEl.color !== this.props.color && newEl.type !== 'King' && expectedMoves.push([nextMoveX, nextMoveY])*/
		}
	}
};