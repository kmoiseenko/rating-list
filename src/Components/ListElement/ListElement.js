import React from 'react';
import './ListElement.css';

const ListElement = (props) => {
  const manageCounterConfirmBtn = () => {
    if (props.data.showConfirm === true) {
      return (
        <div
          className="app-counter__confirm"
          onClick={() => props.handleListElementUpdate(null, props.data.id, props.globalConst.CONFIRM_PLAYER_SCORES_UPDATE)}>
          confirm
        </div>
      );
    }
  }

  return(
    <li className="app-list__element">
      <input
        className="app-list__element-name"
        value={props.data.name}
        onChange={(e) => props.handleListElementUpdate(e, props.data.id, props.globalConst.UPDATE_PLAYER_NAME)}
      />

      <div className="app-counter">
        <input
          type="number"
          className="app-counter__input"
          value={props.data.score}
          onChange={(e) => props.handleListElementUpdate(e, props.data.id, props.globalConst.UPDATE_PLAYER_SCORES)}
        />
        {manageCounterConfirmBtn()}
      </div>

      <div
        className="app-list__element-delete"
        onClick={() => props.handleListElementUpdate(null, props.data.id, props.globalConst.DELETE_PLAYER_FROM_LIST)}>
        Delete
      </div>
    </li>
  );
}

export default ListElement;
