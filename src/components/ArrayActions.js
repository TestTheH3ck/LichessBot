import React from 'react';

export const MultiplyArray = (moves) => {

	let newArr = [];
	let secArr = [];
	var index = [0,0];

	for(let i = 0; i < moves.length; i++) {
		for(let x = 1; x < 8; x++) {
			for(let j = 0; j < moves[i].length; j++) {
				index[j] = moves[i][j] * x;
			}
			secArr.push(JSON.parse(JSON.stringify(index)))
		}
		newArr.push(secArr);
		secArr =[];
	}
	return newArr
};

export const TrueLink =(link) => {
	for (var x = link.length-1; x >= 0; x--) {
		if (link[x] === '/') {
			return link.slice(x+1)
			break;
		}
	}
}
export const arraysEqual = (a1,a2) => {
	/* WARNING: arrays must not contain {objects} or behavior may be undefined */
	return JSON.stringify(a1)==JSON.stringify(a2);
}

export const fromPx = (array, color, el1, el2) => {
	color === 'white' ? el1 = 448 - array[1]*64 : el1 = array[1]*64
	color === 'white' ? el2 = 448 - array[0]*64 : el2 = array[0]*64

	return [el1, el2]
};

export const toPx = (el) => {
	return [el[0] * 64,el[1] * 64]
}

export const arrayExist = (fullAr, partAr, x) => {
	var fullar = JSON.stringify(fullAr);
	var partar = JSON.stringify(partAr);
	fullar.indexOf(partar) !== -1 ? x = true : x = false;
	return x
}

export const arrayIndex = (fullAr, partAr) => {
	var fullar = JSON.stringify(fullAr);
	var partar = JSON.stringify(partAr);
	return fullar.indexOf(partar)
}

export const IteratingArray = (moves, mult = 1) => {

	for(var i = 0; i < moves.length; i++) {
		for(var j = 0; j < moves[i].length; j++) {
			moves[i][j] *= mult;
		}
	}
	return moves
};