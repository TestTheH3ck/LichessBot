import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, ControlLabel, FormGroup, Button, FormControl } from 'react-bootstrap';
import { fetchName } from '../actions/index'
import { connect } from 'react-redux'

class ShortLogin extends Component {
	constructor(props) {
		super(props)
	}

	handlingClick(e) {
		e.preventDefault()

		let name = ReactDOM.findDOMNode(this.names).value;
		let password = ReactDOM.findDOMNode(this.password).value;

		this.props.fetchName(name)
		socket.emit('get cookie', {name, password});
	}

	render() {
		return (
			<Form inline style={{marginTop: 40}}>
				<FormGroup
					controlId="formInlineName"
				>
					<ControlLabel>UserName</ControlLabel>
					{' '}
					<FormControl
						ref={(input) => this.names = input }
						type="text"
						placeholder="Jane Doe"/>
				</FormGroup>
				{' '}
				<FormGroup
					controlId="formInlineEmail"
				>
					<ControlLabel>Password</ControlLabel>
					{' '}
					<FormControl
						ref={(input) => this.password = input }
						type="password"
						placeholder="1111"/>
				</FormGroup>
				{' '}
				<Button type="submit" onClick={this.handlingClick.bind(this)}>
					Send Data
				</Button>
			</Form>
		)
	}
}

export default connect('', { fetchName })(ShortLogin)