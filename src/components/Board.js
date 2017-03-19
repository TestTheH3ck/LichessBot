import React, { Component } from 'react';
import BoardSquare from './BoardSquare';
import { arrayExist } from './ArrayActions'
import { connect } from 'react-redux'
import { setFirstmove } from '../actions/index'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {

	constructor(props) {
	  super(props);
  }

	getBoard(color, yolo = [], light, lastmove, animate, mult) {
		this.props.color === 'white' ? color = 700 : color = 0
		console.log('black')
		for (let a = 7; a >= 0; a--) {
			for (let b = 7; b >= 0; b--) {
				animate = false
				if (this.props.lastmove) (this.props.lastmove[0][0] === a && this.props.lastmove[0][1] === b ) || (this.props.lastmove[1][0] === a && this.props.lastmove[1][1] === b) ? lastmove = this.props.lastmove : lastmove = false
				arrayExist(this.props.availMoves, [a, b]) === true ? light = true : light = false;
				if (this.props.board[a][b].type === 'Empty' && !lastmove && light === false) continue
				if (lastmove && lastmove !== false && lastmove[0][0] === a && lastmove[0][1] === b && this.props.firstmoving === true && animate !== true) {
					console.log('yep yep', this.props.firstmoving)
					this.props.setFirstmove(false)
					animate = true;
				}
				yolo.push(
					<BoardSquare
					lastmove={lastmove}
					mult={color}
					animate={animate}
					onClick={this.props.handleClick.bind(this, [a, b])}
					onDrag={this.props.handleClick.bind(this, [a, b], 'drag')}
					lighting={light}
					position={[  Math.abs(color - b * 100) ,Math.abs(color - a * 100) ]}
					background={this.props.board[a][b].type}
					figureColor={this.props.board[a][b].color}
				/>)
			}
		}/*
		console.log('yolo', yolo, this.props.board, this.props.lastmove)*/
		return yolo
	}
	render() {
		var renderboard = this.getBoard()
		return (
			<div>
				{renderboard}
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log(state, 'LUL')
	return {
		board: state.board.board,
		lastmove: state.board.lastmove,
		firstmoving: state.board.firstmove
	};
}

Board = DragDropContext(HTML5Backend)(Board);
export default connect(mapStateToProps, { setFirstmove })(Board)