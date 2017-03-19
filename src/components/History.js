import React, { Component } from 'react'
import HistoryEl from './HistoryEl'
import { arraysEqual } from './ArrayActions'
import Measure from 'react-measure'

class History extends Component {
	constructor(props) {
		super(props)

		this.state = {
			active: false,
			width: 300,
			height: 400,
			background: 'http://s1.iconbird.com/ico/2014/1/625/w512h5121390855587zoomin512.png'
		}
	}


	history (board=this.props.history.childrens, index) {
		var his = [];
		his.push(
				<ol>{this.list(board, index)}</ol>
		)
		return his
	};

	list (obj, index, newel) {
		var goal = [];
		obj.map((nextel, i) => {
			var elkey = Object.keys( nextel );
			nextel[elkey].map((el, j) => {
				var newIndex;
				if(typeof index !== 'undefined') {
					if(obj[i][obj[i].length-1] === el)  {
						newel = index
					}
					newIndex = index.concat([[i, j]])
				} else {
					if (obj[obj.length-1] === el) {
						newel = index.push([[i, j]]);
					}
					newIndex = [[i, j]];
				}
				var elstyle = ''
				console.log(newIndex, this.props.cursel, arraysEqual(newIndex, this.props.cursel))
				arraysEqual(newIndex, this.props.cursel) === true ? elstyle = 'active' : elstyle = ''
				goal.push(
						<HistoryEl
							onClick={this.props.onClick.bind(this, el, newIndex, newel)}
							element={el.board}
							elstyle={elstyle}
							key={[i, j]}/>
				);
				if (el.childrens && el.childrens.length > 0) {
					var newList = this.history(el.childrens, newIndex)
					goal.push(newList);
				}

			})
		});
		return goal;
	};

	handlingClick(e) {

	var On = 'http://s1.iconbird.com/ico/2014/1/625/w512h5121390855593zoomout512.png'
	var Off = 'http://s1.iconbird.com/ico/2014/1/625/w512h5121390855587zoomin512.png'
	if (this.state.active === false) {
		this.setState({
			active: true,
			width: 500,
			height: 800,
			background: On
		})
	} else {
		this.setState({
			active: false,
			width: 300,
			height: 400,
			background: Off
		})
	}
	}
	render() {
		return (
			<div className="history" style={{width: this.state.width, height: this.state.height}}>
				<div style={{border: '5px solid transparent'}} >
				<div style={{width: 40, right: 5, top: 5, height: 40, position: 'absolute',  backgroundSize: 40, backgroundImage: 'url(' + this.state.background + ')'}} onClick={this.handlingClick.bind(this)}/>
				{this.props.history.childrens && this.history()}
			</div>
				</div>
		)
	}
};

export default History
