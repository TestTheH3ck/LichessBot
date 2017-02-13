import React from 'react';
import ChatLogic from './containers/MainContainer';
import ChessContainer from './containers/ChessContainer';
import EnchantedForm from './nameForm';
import { connect } from 'react-redux';
import { fetchName } from '../actions/index'

class ChatStart extends React.Component {
  constructor(props){
    super(props)

  }
  handleSubmit(e) {
    console.log(e)
    this.props.fetchName(e)
  }

  render() {
    return (
      <div>
        {typeof this.props.name[0] !== 'undefined' ?  <ChessContainer /> : <EnchantedForm onClick={this.handleSubmit.bind(this)}/> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { name: state.name };
}

export default connect(mapStateToProps, { fetchName })(ChatStart)