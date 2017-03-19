import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Col, ControlLabel, FormGroup, Button, FormControl, HelpBlock } from 'react-bootstrap';

export default class NameForm extends Component {
  constructor(props) {
    super(props)

		this.state = {
			allright: true
		}
  }

  handleCreate(e) {
    e.preventDefault();

    let name = ReactDOM.findDOMNode(this.select).value;
		let password = ReactDOM.findDOMNode(this.color).value;
		let link = ReactDOM.findDOMNode(this.link).value;

    this.props.onClick(name, password, link)
  }

	handlingChanging(e) {
		if (e.target.value) {
			this.setState({ allright: false, styling: 'success' })
		} else {
			this.setState({allright: true, styling: 'error'})
		}
	}

  render() {
    return (
    	<Form horizontal bsClass="signInForm">
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						User
					</Col>
					<Col sm={10}>
						<FormControl
							bsClass="form-control UserForm"
							type="text" placeholder="UserName"
							ref={(input) => this.select = input }
						/>
						<FormControl.Feedback />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={2}>
						Password
					</Col>
					<Col sm={10}>
						<FormControl
							bsClass="form-control UserForm"
							type="password" placeholder="Password"
							ref={(input) => this.color = input }
						/>
					</Col>
				</FormGroup>
					<FormGroup validationState={this.state.styling}>
						<Col componentClass={ControlLabel} sm={2}>
							Link
						</Col>
						<Col sm={10}>
							<FormControl
								onChange={this.handlingChanging.bind(this)}
								bsClass="form-control UserForm"
								type="text" placeholder="https://lichess.org/oEUUojE"
								ref={(input) => this.link = input }
							/>
							{this.state.allright && <HelpBlock>REQUIRED</HelpBlock>}
						</Col>
					</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button
							bsStyle="success"
							type="submit"
							onClick={this.handleCreate.bind(this)}
							disabled={this.state.allright}
						>
							Sign in
						</Button>
					</Col>
				</FormGroup>
			</Form>
    )
  }
}
