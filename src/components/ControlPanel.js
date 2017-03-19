import React from 'react'

export const ControlPanel = (props) => {
	return (
		  <div className="turn-board" onClick={props.onClick.bind(this)}/>
	)
}