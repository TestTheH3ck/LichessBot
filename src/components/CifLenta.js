import React from 'react'

export const CifLenta = (props) => {

	var makeLenta = (arr = [], pos=745, col) => {
		col = props.color === 'black' ? 9 : 0
		console.log(props.color)
		var letter;
		for (var x = 0; x < 8; x++) {
			switch(x) {
				case 7:
					letter = 'A'
					break;
				case 6:
					letter = 'B'
					break;
				case 5:
					letter = 'C'
					break;
				case 4:
					letter = 'D'
					break;
				case 3:
					letter = 'E'
					break;
				case 2:
					letter = 'F'
					break;
				case 1:
					letter = 'G'
					break;
				case 0:
					letter = 'H'
					break;
			}
			arr.push(
				<div style={{height: 100, transform: `translate(-13px, ${pos}px)` ,width: 10, display: 'inline-block', position: 'absolute', fontSize: 17}}>{Math.abs(col-(x+1))}</div>
			)
			arr.push(
				<div style={{height: 100, transform: `translate(${pos}px, 803px)` ,width: 10, display: 'inline-block', position: 'absolute', fontSize: 17}}>{letter}</div>
			)
			pos -= 100
		}
		console.log(arr)
		return arr;
	}

	return(
		<div>
			{makeLenta()}
		</div>
	)
}