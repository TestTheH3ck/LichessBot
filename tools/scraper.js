var Nightmare = require('nightmare');


var scraper = (link, cookie) => {
	var nightmare = Nightmare({
		show: true
	});
	return nightmare
		.goto('https://ru.lichess.org/')
		.then(function () {
			if (cookie) {
				return nightmare
					.cookies.set(cookie)
					.wait(100)
			}
		})
		.then(function () {
			return nightmare
				.goto(link)
				.wait('#lichess')
				.evaluate(function () {
					var PlayerColor = 'black'
					if (document.querySelector('div > div > div.orientation-white')) {
						PlayerColor = 'white'
					}
					var lastmove = document.querySelectorAll('div > div > div > div > square.last-move');
					var board = document.querySelectorAll('div > div > div > div > piece');
					return {lastmove, board, PlayerColor}
				})
				.end()
				.then(function (result) {
					result.lastmove = Object.values(result.lastmove)
					result.board = Object.values(result.board)
					return scraper(result)
				})
		})

	function scraper(content) {
		let board = new Array(8);
		for (let i = 0; i < 8; i++) {
			board[i] = new Array(8);
		}
		for (let a = 0; a < 8; a++) {
			for (let b = 0; b < 8; b++) {
				board[a][b] = { type: 'Empty', color: '' }
			}
		}
		var finalPos = [];

		for (var piece of content.lastmove) {
			var posFig = piece.cgKey
			if (posFig) {
				var newel = decoder(posFig);
				finalPos.push([newel[1], newel[0]])
			}
		}

		for (var piece of content.board) {
			var classFig = piece.cgPiece
			var posFig = piece.cgKey
			let newel = decoder(posFig);
			if (classFig && posFig) {
				let akeys = FigureDelimeter(classFig);
				if (akeys && newel) {
					var type = akeys[1];
					var color = akeys[0];
					board[newel[1]][newel[0]] = {type, color};
				}
			}
		};
		console.log(board)
		/*console.log(board, finalPos)*/
		var finalObj = {board, lastmove: finalPos, PlayerColor: content.PlayerColor}

		return finalObj
	}

	function FigureDelimeter(figure, GoalAr) {
		for (var num = 0; num < figure.length; num++) {
			if (figure[num] === ' ') {
				var first = figure.slice(0, num);
				var second = figure.slice(num + 1);
				GoalAr = [first,second]
			}
		}
		if(GoalAr) return GoalAr
	}

	function decoder(thestring, GoalAr) {
		if (!thestring) return;
		var first;
		switch (thestring[0]) {
			case 'a' :
				first = 7;
				break;
			case 'b' :
				first = 6;
				break;
			case 'c' :
				first = 5;
				break;
			case 'd' :
				first = 4;
				break;
			case 'e' :
				first = 3;
				break;
			case 'f' :
				first = 2;
				break;
			case 'g' :
				first = 1;
				break;
			case 'h' :
				first = 0;
				break;
		}
		var second = parseInt(thestring[1]-1);
		GoalAr = [first,second]

		return GoalAr;
	}
};

module.exports = scraper;
