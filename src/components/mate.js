import React from 'react';

export const Mate = (props) => {
	return (
		<div className={props.color}>
			{props.color}
			{`${props.color} you won`}
		</div>
	)
};