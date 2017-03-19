import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';



export default class Squad extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		const { connectDragSource, isDragging, onClick } = this.props;
    var light;
		this.props.lighting ? light = 'Circle' : light = '';
    var curClasses = `white ${this.props.background}-${this.props.figureColor} ${light}`;
    return (
      <div
				style={`transform: translate(${position[0]}px, ${position[1]}px);`}
        className={curClasses}
        onClick={onClick}
				background={this.props.background}
				figureColor={this.props.figureColor}
				lighting={light}
      >
      </div>
    )
  }
}
