import React from 'react';
import './ListElement.css';

const ListElement = (props) => {
  const manageCounterConfirmBtn = () => {
    if(props.data.showConfirm === true) {
      return <div className="app-counter__confirm" onClick={() => props.handleConfirmUpdateScore(props.data.id)}>confirm</div>
    }
  }

  return(
    <li className="app-list__element">
      <input
        className="app-list__element-name"
        value={props.data.name}
        onChange={(e) => props.handleUpdateName(e, props.data.id)}
      />
      
      <div className="app-counter">
        <input
          type="number"
          className="app-counter__input"
          value={props.data.score}
          onChange={(e) => props.handleUpdateScore(e, props.data.id)}
        />
        {manageCounterConfirmBtn()}
      </div>

      <div className="app-list__element-delete" onClick={() => props.handleDeleteElement(props.data.id)}>Delete</div>
    </li>
  );
}

export default ListElement;
