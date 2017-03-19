import React from 'react'
import MessagesLog from '../messagesLog';
import { FormGroup, Button, FormControl, Grid } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import '../../style/style.css';
import { fetchMessage } from '../../actions/index';
import { connect } from 'react-redux';

class ChatLogic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: 'test',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    console.log('Mounted');
    socket.on('chat message', (inboundMessage) => {
      const newMessage = {user: inboundMessage.message.user, message: inboundMessage.message.message};
      this.props.fetchMessage(newMessage)
      /*let structure = this.state.structure ? [...this.state.structure, newMessage]: [newMessage]*/
    })
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  handleChange(e) {

    this.setState({input: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    socket.emit('chat message', { message: this.state.input, user: this.props.name })
    this.setState({ input: '' })
    ReactDOM.findDOMNode(this.select).focus()
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }
  render() {
    return (
      <div>
        <FormGroup onSubmit={this.handleSubmit} >
          <FormControl
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            ref={(yo) => { this.select = yo }}
          />
          <Button
            bsStyle="success"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
        <div className="stuck">
        {this.props.structure && <MessagesLog structure={this.props.structure} />}
          <div
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    structure: state.structure,
    name: state.name
  };
}

export default connect(mapStateToProps, { fetchMessage })(ChatLogic)