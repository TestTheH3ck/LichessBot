import React, { Component } from 'react';
import { connect } from 'react-redux';

class HistoryEl extends Component {
	constructor(props) {
		super(props)

		this.state = {
			figure: '',
			style: ''
		}
	}
	componentDidMount() {
		this.type()

		console.log(this.props.board[this.props.element[0][0]][this.props.element[0][1]].type)
	}

	componentWillUpdate() {
	}

	choice(element) {
		switch (element) {
			case 7:
				return 'A'
				break;
			case 6:
				return 'B'
				break;
			case 5:
				return 'C'
				break;
			case 4:
				return 'D'
				break;
			case 3:
				return 'E'
				break;
			case 2:
				return 'F'
				break;
			case 1:
				return 'G'
				break;
			case 0:
				return 'H'
				break;
		}
		return 'DUNNO'
	};

	type() {
		switch(this.props.board[this.props.element[0][0]][this.props.element[0][1]].type) {
			case 'rook':
				this.setState({ figure: '♜' });
				break;
			case 'knight':
				this.setState({ figure: '♞'});
				break;
			case 'pawn':
				this.setState({ figure: '♟' });
				break;
			case 'bishop':
				this.setState({ figure: '♝' });
				break;
			case 'king':
				this.setState({ figure: '♚' });
				break;
			case 'queen':
				this.setState({  figure: '♛' })
				break;
		}
	}

	handlingClick(e) {

		this.setState({ style: 'active'	})
		this.props.onClick(e)
	}

	render() {
		return (
			<li onClick={this.props.onClick.bind(this)} className={this.props.elstyle}>
				{`${this.choice(this.props.element[1][1])}${this.props.element[1][0] + 1} ${this.choice(this.props.element[0][1])}${this.props.element[0][0] + 1} ${this.state.figure}`}
			</li>
		)
	}
};

function mapStateToProps(state) {
	return {
		board: state.board.board,
	};
}

export default connect(mapStateToProps)(HistoryEl)