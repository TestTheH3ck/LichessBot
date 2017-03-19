import BoardSquare from '../BoardSquare'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CifLenta } from '../CifLenta'
import { fetchBoard, setColor, setLink, setLastmove, setFirstmove } from '../../actions/index'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getMovement } from '../GetMovement'
import { TrueLink, IteratingArray, arrayExist, toPx,arrayIndex, fromPx, arraysEqual } from '../ArrayActions'
import { startPosition } from '../StartPosition'
import History from '../History'
import MainConrainer from './MainContainer';
import { UserAuth } from '../UserAuth'
import ShortLogin from '../ShortLogin'
import { identifyColor } from '../identifyColor'
import { ControlPanel } from  '../controlPanel'
import { ResetBoard } from '../resetBoard'
import { Mate } from '../mate'
import { Grid, Col, Row } from 'react-bootstrap';
import { Toggle } from '../toggle'
import { AutoUpdate } from '../autoupdate'
import cookie from 'react-cookie';
import Board from '../Board'

class ChessContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      position: null,
			lastmove: [],
			curselected: [[0, 0]],
      availMoves: [],
			movesToggle: false,
			AutoUpdate: true
    }

    this.check = false;
		this.Moves = true;
		this.duno = false;
		this.defColor;
		this.mult;
		this.KingMoveblack;
		this.KingMovewhite;
		this.castcheck = true;
		this.BlackLeftRook = true;
		this.BlackRightRook = true;
		this.WhiteLeftRook = true;
		this.WhiteRightRook = true;
  }

  componentWillMount() {
		var fulllink = `https://ru.lichess.org/${TrueLink(document.URL)}`
		var cook = cookie.load(TrueLink(document.URL))

		this.props.setLink(fulllink)
		socket.on('set cookie', (cook) => {
			cookie.save(`login`, [cook, this.props.name], { path: '/' });
			this.setState({ luckyname: this.props.name })
		});
		var NamedCookies = cookie.load('login')
		console.log(NamedCookies)
		if (NamedCookies) this.setState({ luckyname: NamedCookies[1] })
		if (cook) {
			NamedCookies ? socket.emit('create', `${fulllink}${NamedCookies[1]}`) : socket.emit('create', `${fulllink}`)
			if (NamedCookies) {
				socket.emit('set cookie', (NamedCookies[0]))
				console.log(NamedCookies)
			}
			this.setSocketState(cook.inboundMessage)
		}
	}
  componentDidMount() {

		socket.on('anal', (inboundMessage) => {
			cookie.save(TrueLink(this.props.link), {inboundMessage, name:this.props.name}, { path: '/' });
			console.log(inboundMessage)
			if (arraysEqual(this.defBoard, inboundMessage.board) === true) return
			console.log(inboundMessage)
			this.setSocketState(inboundMessage)
		});
		/*var board = this.props.startedPos ? this.props.startedPos :startPosition();
    this.props.fetchBoard(board);
		console.log('mounted', board, this.props.color);*/
		this.props.color && this.setState({ defColor: this.props.color }) &&
		this.props.color === 'white' ? this.setState({currentMove: true}) : this.setState({currentMove: true});
		if (this.props.scraped) {
			currentMove = true;
			console.log(this.props.lastmove, 'yeah');
			this.props.setLastmove(this.props.lastmove)
			this.setState({
				lastmove: this.props.lastmove
			})
		}

		socket.on('chess', (inboundMessage) => {
			const newMessage = inboundMessage.message.chess;
			console.log(newMessage);
			var boards = this.newBoard(newMessage[0], this.props.board, newMessage[1], true)
			this.setHistory(newMessage);
			this.props.fetchBoard(boards);
			this.setState({
				currentMove: true
			});
		})
  }

	setSocketState(inboundMessage) {
		this.props.fetchBoard(inboundMessage.board);
		var final = identifyColor(inboundMessage.lastmove[0], inboundMessage.board, inboundMessage.lastmove[1]);
		this.props.setColor(final);
		this.defBoard =  inboundMessage.board;
		this.setHistory(inboundMessage.lastmove);
		this.getInitialState(inboundMessage.lastmove);

		this.props.setLastmove(inboundMessage.lastmove)
		this.setState({
			defColor: inboundMessage.PlayerColor,
			lastmove: inboundMessage.lastmove
		})
		console.log(inboundMessage)
	}

  UpdateCondition() {

		this.state.AutoUpdate === true && socket.emit('anal', this.props.link);
	}

  getInitialHis(el) {
		return {
			childrens: [{
				1: [{
					board: el,
					lastmove: el,
					color: this.getColor(),
					childrens: [],
					makefigure: ''
				}]
			}]
		}
	}

  getInitialState(el) {
		this.setState({
			clicked: false,
			position: null,
			availMoves: [],
			curselected: [[0, 0]],
			history: this.getInitialHis(el)
		})
	}

	setHistory(newEl, newfigure) {
		var HistoryObj = {
			board: newEl,
			newfigure,
			KingMoveblack: this.KingMoveblack,
			KingMovewhite: this.KingMovewhite,
			castcheck: this.castcheck,
			BlackLeftRook: this.BlackLeftRook,
			BlackRightRook: this.BlackRightRook,
			WhiteLeftRook: this.WhiteLeftRook,
			WhiteRightRook: this.WhiteRightRook,
			lastmove: newEl,
			color: this.getColor(),
			childrens: []
		};

		var StartedObj = this.getInitialHis(newEl);
		if (this.state.history) {
			var obj = Object.assign({}, this.state.history);
			if (this.state.curselected)  {
				this.HistoryIterate(obj, HistoryObj)
				console.log("FIRST TRY")
			}/* else {
				console.log("FIRST TRY")
				obj.childrens[0][1].push(HistoryObj)
			}*/
			this.setState({history: obj})
		}
	}

	HistoryIterate(history = this.state.history, HistoryObj, index = 0, selectedel = [[0,0]], i = -1, j = -1) {

		for (var element of history.childrens) {
			i++;
			var elkey = Object.keys(element);
			if (i === this.state.curselected[index][0]) {
				for (var elem of element[elkey]) {
					j++;
					console.log(selectedel, this.state.curselected)
					if (j === this.state.curselected[index][1]) {
						if (index + 1 === this.state.curselected.length) {
							console.log(selectedel)
							var joke = elem.childrens.length
							var x = -1;
							var y = -1;
							for (var alko of elem.childrens) {
								x++;
								for (var alkonavt of alko[Object.keys(alko)]) {
									y++
									if (arraysEqual(alkonavt.board[0], HistoryObj.board[0]) === true && arraysEqual(alkonavt.board[1], HistoryObj.board[1])=== true  ) {
										console.log(arraysEqual(alkonavt.board[0], HistoryObj.board[0]) && arraysEqual(alkonavt.board[1], HistoryObj.board[1]))
										joke = alkonavt.childrens.length

										var curselected = this.state.curselected.concat([[x, joke]])
										this.setState({ curselected })
										return;
									}
								}
							}
							console.log(arrayIndex(elem.childrens, HistoryObj), elem.childrens, HistoryObj)
							if (arrayExist(elem.childrens, HistoryObj) === true) break;
							/*if (elem.childrens.length === 0) {
								elem.childrens.push({[joke]: [HistoryObj]})
								console.log('123123123', elem.childrens[0][0])
								selectedel.push([joke, j])
							}  else if (elem.childrens.length > 0) {*/
								console.log(elem, this.state.curselected)
							elem.childrens.push({[joke]: [HistoryObj]})
							selectedel.push([joke, j])

							var curselected = this.state.curselected.concat([[joke, j]])
						  console.log(this.state.curselected, curselected)
							this.setState({ curselected })
							break;
						} else {
							console.log(element)
							index++;
							selectedel.push([i, j])
							this.HistoryIterate(elem, HistoryObj, index, selectedel)
						}
					}
				}
			}
		}/*
		history.childrens.map((element, i) => {
			console.log(this.state.curselected.length, index)
			if (i === this.state.curselected[index][0]) {
				if (index+1 === this.state.curselected.length && JSON.stringify(HistoryObj) !== JSON.stringify(element.childrens[element.childrens.length-1])) {
					if(JSON.stringify(HistoryObj) !== JSON.stringify(history.childrens[i+1])) {
						console.log('YAAAAAAAAAAAAAAAAAA YOP')
						element.childrens.push(HistoryObj)
					}
				} else {
					console.log(element)
					index++;
					this.HistoryIterate(element, HistoryObj, index)
				}
			}
		})*/
	}

	newBoard(index, board, start = this.state.position, mate = false, newfigure) {
		if (index === true) return
		if ( mate === false && !arrayExist(this.state.availMoves, [index[0], index[1]])) return;

		var trueboard = JSON.parse(JSON.stringify(board));
		trueboard = this.newMove(trueboard, start, index, mate, newfigure);
		var condition;
		if(this.History === true) {
			var color = trueboard[index[0]][index[1]].color
			if (trueboard[index[0]][index[1]].type === 'king') {
				if (index[1] - start[1] === 2) condition = 'rightcastling';
				if (index[1] - start[1] === -2) condition = 'leftcastling';
			}
			if (trueboard[index[0]][index[1]].type === 'pawn') {
				condition = 'passing';
			}
			console.log(index, start, condition, color)
			trueboard = this.castlingmove(trueboard, condition, index, color);
		}
		return trueboard
	}

	newMove(trueboard, start, index, mate = false, newfigure) {
		var startPosX = start[0];
		var startPosY = start[1];
		var finalPosX = index[0];
		var finalPosY = index[1];

		console.log(startPosX, startPosY, finalPosX, finalPosY )
		trueboard[finalPosX][finalPosY].type = trueboard[startPosX][startPosY].type;
		trueboard[finalPosX][finalPosY].color = trueboard[startPosX][startPosY].color;
		trueboard[startPosX][startPosY].type = 'Empty';
		trueboard[startPosX][startPosY].color = '';

		if(newfigure) trueboard[finalPosX][finalPosY].type = newfigure;

		return trueboard
	}

  handleClick(index, condition) {
		this.draging = false
		if (condition==='drag') this.draging = true
		console.log(index, 'kokoro');
		this.setState({
			makefigure: ''
		})
		this.Moves = true;
		this.castcheck = true;
		this.duno = false;
		var trueboard  = JSON.parse(JSON.stringify(this.props.board));
		console.log(trueboard)
		var rightColor = trueboard[index[0]][index[1]].color;
    if (this.state.currentMove ) {
			if (this.clicked === true) {
				this.secondClick(index)
			} else if (rightColor === this.props.color) {
				console.log(rightColor, this.props.color);
				this.firstClick(index)
			}
		}
  }

  secondClick(index, condition) {

		var board = this.newBoard(index, this.props.board);
		this.clicked = false;

		if (!board) {
			this.handleClick(index)
			return ;
		}

		this.castlingRooks();
		if (board[index[0]][index[1]].type === 'king') {
			this.props.color === 'black' ? this.KingMoveblack = true : this.KingMovewhite  = true;
			if (index[1] - this.state.position[1] === 2) condition = 'rightcastling';
			if (index[1] - this.state.position[1] === -2) condition = 'leftcastling';
		}
		if (board[index[0]][index[1]].type === 'pawn') {
			condition = 'passing';
		}
		this.castlingmove(board, condition, index);
		if ((index[0] === 0 || index[0] === 7) && board[index[0]][index[1]].type === 'pawn') {
			this.setState({
				makefigure: {board, index}
			})
			} else {
			this.makeDecision(board, index);
		}
	}

	sendTrueMove(index, lastmove) {
		var finalpos = fromPx(index, this.props.color);
		var startedpos  = fromPx(this.state.position, this.props.color);
		if (lastmove) {
			socket.emit('lastmove', [this.props.link, [startedpos, finalpos]]);
		} else {
			socket.emit('move', [this.props.link, [startedpos, finalpos]]);
		}
	}

	makeDecision(board, index, switchel, lastmove) {

		if (this.state.movesToggle === true && lastmove) {
			this.sendTrueMove(index, true)
		} else if(this.state.movesToggle === true ) {
			this.state.movesToggle === true && this.sendTrueMove(index)
		}
		if (this.props.link) {
			this.nextPlayer()
		} else {
			this.setState({
				currentMove: false
			});
			socket.emit('chess', {chess: [index, this.state.position]});
		}
		if (this.draging !== true) this.props.setFirstmove(true)
		if (switchel) board[index[0]][index[1]].type = switchel
		this.props.fetchBoard(board);
		this.props.setLastmove([index, this.state.position])
		this.setHistory([index, this.state.position], switchel);
		this.setState({
			lastmove: [index, this.state.position],
			clicked: false,
			position: [],
			availMoves: [],
			makefigure: ''
		});

		this.Moves = false;
		this.duno = true;
		this.colisionDetect(board);

		if (this.check === true) {
			this.checkmate(board)
		}
	}

	castlingRooks(){
		switch(JSON.stringify(this.state.position)) {
			case JSON.stringify([7,0]):
				this.BlackLeftRook = false;
				break;
			case JSON.stringify([7,7]):
				this.BlackRightRook = false;
				break;
			case JSON.stringify([0,0]):
				this.WhiteLeftRook = false;
				break;
			case JSON.stringify([0,7]):
				this.WhiteRightRook = false	;
				break;
		}
	}

	castlingmove(board, condition, index, color = this.props.color) {
		console.log(condition)
		if(condition === 'leftcastling') {
			if (color === 'white') {
				board[0][2].type = board[0][0].type;
				board[0][2].color = color
				board[0][0].type = 'Empty';
				board[0][0].color = '';
			} else {
				board[7][2].type = board[7][0].type;
				board[7][2].color = color
				board[7][0].type = 'Empty';
				board[7][0].color = '';
			}
		} if(condition === 'rightcastling') {
			if (color === 'white') {
				board[0][4].type = board[0][7].type;
				board[0][4].color = color;
				board[0][7].type = 'Empty';
				board[0][7].color = '';
			} else {
				board[7][4].type = board[7][7].type;
				board[7][4].color = color;
				board[7][7].type = 'Empty';
				board[7][7].color = '';
			}
		}

		if (condition === 'passing') {
			board[index[0] + this.mult ][index[1]].type = "Empty";
			board[index[0] + this.mult ][index[1]].color = '';
		}
		return board ;
	}

	nextPlayer() {
		var NewName = this.props.color === 'white' ?  NewName ='black' :  NewName = 'white';
		this.props.setColor(NewName)
	}

  firstClick(index) {

		var ClickedFigure = this.props.board[index[0]][index[1]].type;

		if (ClickedFigure == 'Empty') return;
		this.setState({
			position: index
		});

		this.clicked = true;
		var availMoves = this.moveAvailable(ClickedFigure, index);
		this.setState({
			availMoves
		})
		console.log(availMoves)
	}

  moveAvailable(figure, index, board = this.props.board, color=this.props.color) {

		var figure = board[index[0]][index[1]].type;
		this.mult = 1;
		color === 'black' ? this.mult = -1 : this.mult = 1;
		/*console.log(this.mult, color, figure)*/
		var moves;

		var availMoves = () => {
			switch (figure) {
				case 'pawn':
					var atackLines = this.mult === 1 ? atackLines = [[1, -1], [1, 1]] : atackLines = [[-1, 1], [-1, -1]]
					var el = this.validationMove(index, atackLines, 'atack', board, color);
					moves = IteratingArray([[-1, 0]],this.mult);
					var inpassing = this.validationMove(index, atackLines, 'passing', board, color);
					const movesIf = IteratingArray([[-2, 0]], this.mult);
					var movesCond = this.validationMove(index, movesIf, 'double', board, color);
					/*console.log(this.mult)*/
					var availMove = [];
					availMove = this.validationMove(index, moves, 'single', board, color);
					availMove = availMove.concat(el).concat(inpassing)
					availMove = availMove.concat(movesCond);

					return availMove;
				case 'knight':
					moves = getMovement(figure);
					availMove = this.validationMove(index, moves, false, board, color);

					return availMove;
				case 'bishop':
					moves = getMovement(figure);
					availMove = this.validationMove(index, moves, 'diag', board, color);
					console.log(availMove)

					return availMove;
				case 'rook':
					moves = getMovement(figure) ;
					availMove = this.validationMove(index, moves, 'diag', board, color);

					return availMove;
				case 'queen':
					moves = getMovement(figure);
						availMove = this.validationMove(index, moves, 'diag', board, color);

					return availMove;
				case 'king':
					moves = getMovement(figure);
					availMove = this.validationMove(index, moves, false, board, color);
					var leftcastling = this.validationMove(index, [[0, -2]], 'castlingleft', board, color);
					var rightcastling = this.validationMove(index, [[0, 2]], 'castlingright', board, color);
					this.Moves === true && console.log('sdfsdf')
					availMove = availMove.concat(leftcastling).concat(rightcastling)
					return availMove;
			}
		};
		return availMoves()
  }

  validationMove(index, moves, condition=false, board, color = this.props.color) {

    var expectedMoves = [];
		var realel;
		var realels;

		for (var move of moves) {
			if (condition === 'diag') {
        for (var el of move) {
					realels = this.elValid(el, index, board, color);
					if (realels && realels !== true) {
						realel = board[realels[0]][realels[1]];
					} else if(!realels) {
						break
					} else if(realels === true) {
						continue
					}
					if (realel) {
						console.log(realel.color, color)
						if (realel.color === color) {
							console.log(realel.color, color)
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

	elValid(move, index, board, color, condition, resultColor, id = true) {

		let PositionX = index[0];
		let PositionY = index[1];
		var nextMoveX = PositionX + move[0];
		var nextMoveY = PositionY + move[1];

		this.Moves === true && console.log(move, index, board, color, condition)

		if (nextMoveX > -1 && nextMoveX < 8 && nextMoveY > -1 && nextMoveY < 8) {
			if (this.Moves === true) {
				var asd = this.newBoard([nextMoveX, nextMoveY], board, index, true);
				this.duno = true;
				this.colisionDetect(asd, 'enemy');
				this.duno = false;
			}
			var newEl = board[nextMoveX][nextMoveY];

			if (condition === 'double') {
			  if(PositionX !== 1 && color === 'white') return;
			  if(PositionX !== 6 && color === 'black') return;
			}
			if(nextMoveX+this.mult < 8 && nextMoveX+this.mult > -1 && condition === 'double') var newEl2 = board[nextMoveX+this.mult][nextMoveY];
			var inpassing = this.state.lastmove
			this.Moves === true && condition === 'passing' && console.log(nextMoveY, inpassing[0][1])
			if (condition === 'passing' && (inpassing[1][0] - inpassing[0][0] !== -2 * this.mult || PositionX !== inpassing[0][0] || nextMoveY !== inpassing[0][1] )) return
			if (condition === 'double' && (newEl.type !== 'Empty' || newEl2.type !== 'Empty')) return;
			if (condition === 'single' && newEl.type !== 'Empty') return;
			if (condition === 'atack' && (newEl.color === color || newEl.type === 'Empty')) return;
			color === 'black' ? resultColor = this.KingMoveblack : resultColor = this.KingMovewhite
			if ((condition === 'castlingleft' || condition === 'castlingright') && this.check === false && resultColor  === true ) {
				console.log(this.KingMoveblack, this.KingMovewhite)
				return;
			}
			if (condition === 'castlingleft' && this.castcheck === true) console.log('JUST LOOK AT ME', this.leftCastling())
			if (condition === 'castlingleft' && this.castcheck === true && this.check === false && !this.leftCastling()) {
				console.log('left')
				return;
			}
			if (condition === 'castlingright' &&  this.castcheck === true && this.check === false && !this.rightCastling()) {
				console.log('right')
				return;
			}
			if (!condition && newEl.color === color) return

			if (newEl.type === 'king' && newEl.color !== color) {
				this.check = true
			}
			if (this.check === false || this.duno === true) {
				if (newEl.color !== color) return [nextMoveX, nextMoveY];
			}
			if(this.check === true && this.Moves === true && newEl.color !== this.getColor()) {
				return true
			}
		}
	}

	leftCastling(board = this.props.board) {
		if (this.props.color === 'black') {
			if (board[7][1].type !== 'Empty' || board[7][2].type !== 'Empty' || this.castlingAtacklines([[7,1],[7,2]]) === false || this.BlackLeftRook === false) return;
		} else {
			if (board[0][1].type !== 'Empty' || board[0][2].type !== 'Empty' || this.castlingAtacklines([[0,1],[0,2]]) === false || this.WhiteLeftRook === false) return;
		}
		return true;
	}

	rightCastling(board = this.props.board) {
		if (this.props.color === 'black') {
			if (board[7][6].type !== 'Empty' || board[7][5].type !== 'Empty' || board[7][4].type !== 'Empty' || this.castlingAtacklines([[7,5],[7,4],[7,6]]) === false  || this.BlackRightRook === false) return;
		} else {
			if (board[0][6].type !== 'Empty' || board[0][5].type !== 'Empty' || board[0][4].type !== 'Empty' || this.castlingAtacklines([[0,5],[0,4],[0,6]]) === false || this.WhiteRightRook === false) return;
		}
		return true;
	}

	castlingAtacklines(condition, board = this.props.board, x = true) {
		this.Moves = false;
		this.check = false;
		this.castcheck = false
		var availFig = this.getFigures('enemy', board);
		for (var index of availFig) {
			var fig = board[index[0]][index[1]].type;
			var col = this.getColor();
			this.check = false;
			var newBoard = this.moveAvailable(fig, index, board, col);
			console.log(this.check, newBoard, fig, index, col)
			for (var el of condition) {
				if (arrayExist(newBoard, el)) {
					console.log('FUUUUUUUUUUUUUUUUUUUUUUUCK', newBoard, el)
					x = false
					break;
				}
			}
		};
		this.castcheck = true;
		return x
	}

	colisionDetect(board = this.props.board, side = 'friendly') {

		this.Moves = false;
		this.castcheck = false
		this.check = false;
		var availFig = this.getFigures(side, board);
		var moves = [];

		availFig.map((el) => {
			var type = board[el[0]][el[1]].type;
			side === 'friendly' ? this.moveAvailable(type, el, board) : this.moveAvailable(type, el, board, this.getColor())
		});
		this.Moves = true;
		this.castcheck = true;
	}

	getColor(col) {
		this.props.color === 'black' ? col = 'white' : col = 'black';
		return col
	}

	getFigures(side, board) {
		var availFig = [];
		for (let a = 0; a < 8; a++) {
			for (let b = 0; b < 8; b++) {
				var figure = board[a][b];
				if (side === 'enemy') {
					figure.color !== this.props.color && figure.type != 'Empty' && availFig.push([a, b])
				} else {
					figure.color === this.props.color && availFig.push([a,b])
				}
			}
		}
		return availFig
	}

	checkmate(board) {
		var availFig = this.getFigures('enemy', board);
		for (var index of availFig) {
			var fig = board[index[0]][index[1]].type;
			var col = this.getColor();
			var newBoard = this.moveAvailable(fig, index, board, col);
			for (var x of newBoard) {
				if (!x) break
				var asd = this.newBoard(x, board, index, true);
				this.colisionDetect(asd);
				if (this.check === false) {
					console.log('wuf wuf')
					return
				}
			}
		};
		this.mate = true;
		this.props.setColor('')
	}

	MovesIterate(id, el, history = this.state.history, newboard, index = 0, i = -1, j = -1) {
		this.History = true

		for (var element of history.childrens) {
			console.log(element)
			var elkey = Object.keys(element);
			i++;
			if (i === id[index][0]) {
				for (var elem of element[elkey]) {
					j++
					console.log(elem)
					newboard ? newboard = this.newBoard(elem.board[0], newboard, elem.board[1], true, elem.newfigure) : newboard = this.defBoard
					console.log(id.length, index, id[index], i);
					if (j === id[index][1]) {
						if (index + 1 === id.length) {
							console.log(newboard);
							this.History = false;
							return newboard;
							break;
						}
						index++;
						if (elem.childrens.length > 0) {

							return this.MovesIterate(id, el, elem, newboard, index)
						}
					}
				}
			}
		}
	}

	/*history() {
		var his = [];
		this.state.history.map((el, i) => {
			his.push(
				<li
				onClick={this.onClick.bind(this, i)}
				>{[i]}
				</li>
			 )
		})
		return his
	}*/


  penetration() {
		if(this.state.defColor) {
			if (this.state.defColor === 'white') {
				return <Board color={this.state.defColor} availMoves={this.state.availMoves} handleClick={this.handleClick.bind(this)}/>
			}	else {
				return   <Board color='black' availMoves={this.state.availMoves}/>}
		} else	if (this.props.color === 'white') {
			return  <Board color='white' availMoves={this.state.availMoves}/>
		}	else if (this.props.color === 'black') {
			return  <Board color='black' availMoves={this.state.availMoves}/>
		}
  };

  onClickv2(el, index, newel) {
		console.log(index, newel, 'tut')
		this.curselobj = '';
		var newboard = this.props.scraped ? this.props.startedPos : startPosition();
		newboard = this.MovesIterate(index, el.board);

		this.props.setFirstmove(true);
		var final = identifyColor(el.board[0], newboard);
		console.log(final)
		this.KingMoveblack = el.KingMoveblack;
		this.KingMovewhite = el.KingMovewhite
		this.castcheck = el.castcheck;
		this.BlackLeftRook = el.BlackLeftRook;
		this.BlackRightRook = el.BlackRightRook;
		this.WhiteLeftRook = el.WhiteLeftRook;
		this.WhiteRightRook = el.WhiteRightRook;
		this.props.setColor(final);
		this.props.fetchBoard(newboard);
		this.props.setLastmove(el.board);
		if (newel && index.length !== 1) {
			this.setState({
				curselected: index,
			})
		} else if (index.length === 1 && newel) {
			this.setState({	curselected: null })
		}	else {
			console.log(index)
			this.setState({ curselected: index })
		}

		this.setState({
			availMoves: [],
			lastmove: el.board
		})
	}

	handlingClick(e, newcolor){
		e.preventDefault()

		this.state.defColor === 'black' ? newcolor = 'white' : newcolor = 'black'
		this.setState({ defColor: newcolor })
	}

	ResetBoard(){

		socket.emit('anal', this.props.link);
	}

	FiguresPanel() {
		return (
			<div>
				<div className={`test1 Rook-${this.props.color}`} onClick={this.ChooseFigure.bind(this, 1)}></div>
				<div className={`test2 Knight-${this.props.color}`} onClick={this.ChooseFigure.bind(this, 2)}></div>
				<div className={`test3 Bishop-${this.props.color}`} onClick={this.ChooseFigure.bind(this, 3)}></div>
				<div className={`test4 Queen-${this.props.color}`} onClick={this.ChooseFigure.bind(this, 4)}></div>
			</div>
		)
	}

	ChooseFigure(i, figure) {

		switch(i) {
			case 1:
				figure = 'rook';
				break;
			case 2:
				figure = 'knight';
				break;
			case 3:
				figure = 'bishop';
				break;
			case 4:
				figure = 'queen'
				break;
		}
		this.lastmove = true;
		this.makeDecision(this.state.makefigure.board, this.state.makefigure.index, figure, true)
	}

	switchToggle(e) {

		this.state.movesToggle === false ? this.setState({movesToggle: true}) : this.setState({movesToggle: false})
	}

	AutoUpdate(e) {

		socket.emit('autoupdate', this.props.link);
		this.state.AutoUpdate === false ? this.setState({AutoUpdate: true}) : this.setState({AutoUpdate: false})
	}

	RemoveCookies(e) {
		this.setState({
			luckyname: ''
		})
		cookie.remove('login', { path: '/' })
	}

  render() {
		let x;
		var authpanel;
		this.state.luckyname ? authpanel =
			<UserAuth move={this.props.color} switchToggle={this.switchToggle.bind(this)} name={this.state.luckyname} color={this.state.defColor} onClick={this.RemoveCookies.bind(this)}/> : authpanel =
			<div><ShortLogin /></div>
		console.log(this.state.luckyname)
		this.props.board ? x = <div>
			<div className="control-panel">
				<Grid className="gridy">
				<Row className="show-grid">
					<Col xs={6} md={4}>
						<div style={{display: 'inline-block', marginTop: 10}}>
						<AutoUpdate onClick={this.AutoUpdate.bind(this)} style={{marginTop: 25}}/>
					</div> <span style={{fontWeight: 'bold',top: 50, position: 'absolute'}}>AutoRefresh</span></Col>

					<Col xs={6} md={4}>
						<ControlPanel onClick={this.handlingClick.bind(this)} /> <span style={{fontWeight: 'bold'}}>Reverse</span> </Col>
					<Col xsHidden md={4}>
						<ResetBoard onClick={this.ResetBoard.bind(this)}/>  <span style={{fontWeight: 'bold'}}>Refresh</span> </Col>
				</Row>
					</Grid>
			</div>
			<div className="chessHis">
				<div className="board">
					{this.mate && <Mate color={this.props.color} />}
					{this.state.makefigure && this.FiguresPanel()}
					<Board color={this.state.defColor} availMoves={this.state.availMoves} handleClick={this.handleClick.bind(this)}/>
					<CifLenta color={this.state.defColor} />
				</div>
				<History
					cursel={this.state.curselected}
					onClick={this.onClickv2.bind(this)}
					history={this.state.history}
				/>
			</div>
			{authpanel}
		</div> : x = <div></div>
    return (
    	<div className="chessSystem">
				{x}
			</div>
    )
  }
};

function mapStateToProps(state) {
  return {
		link: state.link,
		color: state.color,
		board: state.board.board,
		name: state.name
  };
}

ChessContainer = DragDropContext(HTML5Backend)(ChessContainer);
export default connect(mapStateToProps, { fetchBoard, setColor, setLink, setLastmove, setFirstmove })(ChessContainer)