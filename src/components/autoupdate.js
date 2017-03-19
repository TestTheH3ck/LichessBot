import React from 'react';

export const AutoUpdate = (props) => {
	return (
		<label className="switch-auto" >
			<input type="checkbox" onClick={props.onClick}/>
			<div className="slider"> </div>
		</label>
	)
}