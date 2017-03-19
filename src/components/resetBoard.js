import React from 'react'

export const ResetBoard = (props) => {
	return (
			<div className="reset-board" onClick={props.onClick.bind(this)}/>
	)
}