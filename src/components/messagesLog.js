import React from 'react';
import MessageDetail from './messageDetail'

export default (props) => {
  const structure = props.structure;

  return (
    <div>
      {structure.map((element, index) => {
        return <MessageDetail
          key={index}
          name={element.user}
          chat={element.message}
        />
      })}
    </div>
  )
}
