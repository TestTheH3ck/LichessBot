import Squad from '../squadChess'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from '../../actions/index'

class ChessContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      position: null,
      type: null,
      color: '',
      availMoves: []
    }
  }

  componentWillMount(){
    console.log('will mount');
    let board = this.startPosition();
    this.props.fetchBoard(board);
  }

  startPosition() {
      let board = new Array(8);
      for (let i = 0; i < 8; i++) {
        board[i] = new Array(8);
      }
      for (let a = 0; a < 8; a++) {
        for (let b = 0; b < 8; b++) {
          board[a][b] = { type: 'Empty', color: '' }
        }
      }
      for (let i = 0; i < 8; i++) {
        board[1][i] = { type: 'Pawn', color: 'black'};
        board[6][i] = { type: 'Pawn', color: 'white' };
      }
      return board;
  }

  handleClick(index, e) {
    var trueboard = this.props.board
    if (this.state.clicked === true) {
      var startPosX = this.state.position[0];
      var startPosY = this.state.position[1];
      var finalPosX = index[0];
      var finalPosY = index[1];
      console.log([finalPosX, finalPosY], this.state.availMoves)
      if (this.state.availMoves.includes([finalPosX-startPosX, finalPosY-startPosY])) {
        console.log('ye')
      }

      /*
      console.log(trueboard[startPositionX])*/
      /*need to store dead figures*/
      trueboard[finalPosX, finalPosY].type = trueboard[startPosX, startPosY].type;
      trueboard[finalPosX, finalPosY].color = trueboard[startPosX, startPosY].color;
      trueboard[startPosX, startPosY].type = 'Empty';
      trueboard[startPosX, startPosY].color = '';

      this.props.fetchBoard(trueboard);

      this.setState({
        clicked: false,
      })
    } else {
      this.setState({
        clicked: true,
        position: index
      })
      var startPosition = trueboard[index[0]][index[1]];
      this.moveAvailable(startPosition);

      /*moveAvailable()*/
    }
  }

  moveAvailable(position) {
    switch(position.type){
      case 'Pawn':
        var availMoves = [];
        const moves = [1,0];
        const movesIF = [2][0];
        const atack = [[1,1],[1,-1]];
        let nextPositionX = this.state.position[0];
        let nextPositionY = this.state.position[1];
        availMoves.push([nextPositionX+moves[0],nextPositionY+moves[1]]);
        atack.map((move) => {
          console.log(nextPositionX + move[0],nextPositionY + move[1])

          let atackedEl = this.props.board[nextPositionX + move[0]][nextPositionY + move[1]];
          console.log([nextPositionX + move[0],nextPositionY + move[1]]);
          atackedEl.color === 'black' && availMoves.push([nextPositionX + move[0],nextPositionY + move[1]])

        })
        this.setState({
          availMoves: availMoves})
    }
  }

  penetration() {
    var yolo = [];
    var currentClass;
    for (let a = 0; a < 8; a++) {
      currentClass === 'white' ? currentClass = 'black' : currentClass = 'white';
      for (let b = 0; b < 8; b++) {
        currentClass === 'white' ? currentClass = 'black' : currentClass = 'white';
        yolo.push(
          <Squad
            onClick={this.handleClick.bind(this, [a,b])}
            color={currentClass}
            background={this.props.board[a][b].type}
            figureColor={this.props.board[a][b].color}
          />
        )
      }
    }

    return yolo;
  };

  render() {
    return (
      <div className="Board">
        {this.penetration()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board
  };
}

export default connect(mapStateToProps, { fetchBoard })(ChessContainer)