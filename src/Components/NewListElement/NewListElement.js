import React, { Component } from 'react';
import './NewListElement.css';

import { generateRandom, globalConst } from './../../helpers/tools.js';

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
    if (this.state.name) {
      this.props.handleConfirmAddElement(this.state);
      this.setState({
        id: generateRandom(),
        name: '',
        score: 0
      });
    } else {
      alert('Enter player name');
    }
  }

  handleCancelClick = () => {
    this.props.manageAddElementState();
  }

  handleUpdateElement = (e, type) => {
    const player = this.state;

    switch (type) {
      case globalConst.UPDATE_PLAYER_NAME:
        player.name = e.target.value
        this.setState({name: player.name});
        break;

      case globalConst.DECREASE_PLAYER_SCORES:
        if (player.score > 0) {
          player.score--;
          this.setState({score: player.score});
        }
        break;

      case globalConst.INCREASE_PLAYER_SCORES:
        player.score++;
        this.setState({score: player.score});
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
          <div className="app-list__element-cancel" onClick={ this.handleCancelClick }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"/><path d="M35.707 16.293a.999.999 0 0 0-1.414 0L26 24.586l-8.293-8.293a.999.999 0 1 0-1.414 1.414L24.586 26l-8.293 8.293a.999.999 0 1 0 1.414 1.414L26 27.414l8.293 8.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L27.414 26l8.293-8.293a.999.999 0 0 0 0-1.414z"/>
            </svg>
          </div>

          <input
            className="app-list__element-name"
            placeholder="Имя игрока"
            value={ this.state.name }
            onChange={ (e) => this.handleUpdateElement(e, globalConst.UPDATE_PLAYER_NAME) } />

          <div className="app-counter">
            <div
              className="app-counter__control app-counter__decrease"
              onClick={ () => this.handleUpdateElement(null, globalConst.DECREASE_PLAYER_SCORES) }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M0 0v60h60V0H0zm58 58H2V2h56v56z"/><path d="M9 29h42v2H9z"/></svg>
            </div>

            <div className="app-counter__data">{ this.state.score }</div>

            <div
              className="app-counter__control app-counter__increase"
              onClick={ () => this.handleUpdateElement(null, globalConst.INCREASE_PLAYER_SCORES) }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M0 0v60h60V0H0zm58 58H2V2h56v56z"/><path d="M29 51h2V31h20v-2H31V9h-2v20H9v2h20z"/></svg>
            </div>
          </div>

          <div className="app-list__element-add" onClick={ this.handleAddElementClick }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"/><path d="M35.707 16.293a.999.999 0 0 0-1.414 0L26 24.586l-8.293-8.293a.999.999 0 1 0-1.414 1.414L24.586 26l-8.293 8.293a.999.999 0 1 0 1.414 1.414L26 27.414l8.293 8.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L27.414 26l8.293-8.293a.999.999 0 0 0 0-1.414z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default NewListElement;
