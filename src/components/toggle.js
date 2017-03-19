import React from 'react';

export const Toggle = (props) => {
	return (
		<label className="switch" >
			<input type="checkbox" onClick={props.onClick}/>
			<div className="slider"> </div>
		</label>
	)
}