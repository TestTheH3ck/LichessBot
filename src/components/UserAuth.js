import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
import { Toggle } from './toggle'

export const UserAuth = (props) => {
	return (
		<div className="LogedIn">
		<Navbar>
			<Navbar.Collapse style={{marginLeft: -20}}>
				<Navbar.Text style={{marginTop: 25}}>
					Signed in as: {props.name}
				</Navbar.Text>
				<Navbar.Text style={{marginTop: 25}}>
					Your color: {props.color}
				</Navbar.Text>
				<Navbar.Text style={{marginTop: 25}}>
					Current Move: {props.move}
				</Navbar.Text>
				<Navbar.Text style={{marginTop: 25}}>
					Send to server
				</Navbar.Text>
				<Navbar.Text style={{marginTop: 17}}>
				<div>
					<Toggle onClick={props.switchToggle} />
				</div>
				</Navbar.Text>
				<Navbar.Text style={{marginTop: 18}}>
					<Button onClick={props.onClick} bsStyle="danger">Logout</Button>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
		</div>
	)

}