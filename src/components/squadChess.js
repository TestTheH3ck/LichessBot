import React, { Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }
  // if this.props.clicked && t
  render() {
    let curClasses = `${this.props.color} ${this.props.background}-${this.props.figureColor}`;
    return (
      <div
        className={curClasses}
        onClick={this.props.onClick}
      >
        {/*{props.type}*/}
      </div>
    )
  }
}