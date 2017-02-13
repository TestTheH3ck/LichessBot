import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { FormGroup, Button, FormControl } from 'react-bootstrap';

export default class NameForm extends Component {
  constructor(props) {
    super(props)
  }

  handleCreate(e) {
    e.preventDefault();

    let name = ReactDOM.findDOMNode(this.select).value;
    console.log(name)
    this.props.onClick(name)
  }
  render() {
    return (
      <FormGroup>
        <FormControl
          type="text"
          ref={(input) => this.select = input }
        />
        <Button
          bsStyle="success"
          type="submit"
          onClick={this.handleCreate.bind(this)}
        >
          Submit Name
        </Button>
      </FormGroup>
    )
  }
}
