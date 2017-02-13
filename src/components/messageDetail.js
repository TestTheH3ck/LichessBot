import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default (props) => {
  return (
    <div style={{ height: 90 }}>
      <Panel
        width="100"
        header={props.name}
        bsStyle="primary"
      >
        {props.chat}
      </Panel>
    </div>
  )
}

