import React, { Component } from 'react';
import './NewListElement.css';

import { generateRandom, globalConst } from './../../Tools/tools';

class NewListElement extends Component {
  constructor() {
    super();

    this.state = {
      id: generateRandom(),
      name: '',
      score: 0
    }
  }

  handleAddElementClick = () => {
    this.props.handleConfirmAddElement(this.state);
    this.setState({
      id: generateRandom(),
      name: '',
      score: 0
    });
  }

  handleCancelClick = () => {
    this.props.handleCancelAddNewElement();
  }

  handleUpdateElement = (e, type) => {
    switch (type) {
      case globalConst.UPDATE_PLAYER_NAME:
        this.setState({ name: e.target.value });
        break;

      case globalConst.UPDATE_PLAYER_SCORES:
        this.setState({ score: e.target.value });
        break;

      default:
        //
        break;
    }
  }

  render() {
    return(
      <div>
        <div className="app-list__element">
          <input
            className="app-list__element-name"
            placeholder="Enter player name"
            value={ this.state.name }
            onChange={ (e) => this.handleUpdateElement(e, globalConst.UPDATE_PLAYER_NAME) } />

          <div className="app-counter">
            <input
              type="number"
              className="app-counter__input"
              value={ this.state.score }
              onChange={ (e) => this.handleUpdateElement(e, globalConst.UPDATE_PLAYER_SCORES) } />
          </div>

          <div className="app-list__element-add" onClick={ this.handleAddElementClick }>Add</div>
          <div className="app-list__element-cancel" onClick={ this.handleCancelClick }>Cancel</div>
        </div>
      </div>
    );
  }
}

export default NewListElement;
