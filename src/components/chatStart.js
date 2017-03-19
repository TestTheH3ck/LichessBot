import React from 'react';
import ChatLogic from './containers/MainContainer';
import ChessContainer from './containers/ChessContainer';
import EnchantedForm from './nameForm';
import { connect } from 'react-redux';
import { setColor, fetchName, setLink, fetchBoard } from '../actions/index'
import { identifyColor } from './identifyColor'
import { TrueLink } from './ArrayActions'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

class ChatStart extends React.Component {
  constructor(props){
    super(props)

		this.state = {
			clicked: false,
			startedPosition: null
		}
		this.link
  }

	componentDidMount() {
		/*socket.on('anal', (inboundMessage) => {
			var final = identifyColor(inboundMessage.lastmove[0], inboundMessage.board);
			this.props.setColor(final)
			console.log(inboundMessage.lastmove, final, 'yolo')
			this.setState({
				startedPosition: inboundMessage.board,
				lastmove: inboundMessage.lastmove
			})
		});*/

	}



  handleSubmit(name, password, link) {
    this.props.fetchName(name)

		if (link) {
			this.setState({
				clicked: true,
			});
			this.link = TrueLink(link)
			socket.emit('create', `${link}${name}`);
			socket.emit('anal', link);
			if (name) {
				socket.emit('get cookie', {name, password, link});
			}
			this.props.setLink(link)
		}
  }

  generate(){
		/*if(typeof this.props.name[0] !== 'undefined' && !this.state.clicked) {
			return <ChessContainer />
		} else*/
		if(this.link) {
			browserHistory.push('/game/'+this.link)
		} else {
			return <EnchantedForm onClick={this.handleSubmit.bind(this)}/>
		}
	}

  render() {
    return (
      <div>
        {this.generate()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { name: state.name };
}

export default connect(mapStateToProps, { setColor, fetchName, setLink })(ChatStart)