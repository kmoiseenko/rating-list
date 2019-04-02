import React, { Component } from 'react';
import './NewListElement.css';

class NewListElement extends Component {
  constructor() {
    super();

    this.state = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      name: '',
      score: 0
    }
  }

  handleAddElementClick = () => {
    this.props.handleConfirmAddElement(this.state);
  }

  handleCancelClick = () => {
    this.props.handleCancelAddingNewElement();
  }

  handleUpdateName = (e) => {
    this.setState({name: e.target.value})
  }

  handleUpdateScore = (e) => {
    this.setState({score: e.target.value})
  }

  render() {
    return(
      <div>
        <div className="app-list__element">
          <input className="app-list__element-name" placeholder="Enter player name" value={this.state.name} onChange={this.handleUpdateName} />

          <div className="app-counter">
            <input type="number" className="app-counter__input" value={this.state.score} onChange={this.handleUpdateScore} />
          </div>

          <div className="app-list__element-add" onClick={this.handleAddElementClick}>Add</div>
          <div className="app-list__element-cancel" onClick={this.handleCancelClick}>Cancel</div>
        </div>
      </div>
    );
  }
}

export default NewListElement;
