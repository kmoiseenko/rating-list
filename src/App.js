import React, { Component } from 'react';
import ListElement from './Components/ListElement/ListElement';
import NewListElement from './Components/NewListElement/NewListElement';
import './App.css';

import { globalConst, generateRandom, sortList } from './Tools/tools';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [
        { id: generateRandom(), name: 'Kostya', score: 23 },
        { id: generateRandom(), name: 'Max', score: 1 },
        { id: generateRandom(), name: 'Kevin', score: 24 },
        { id: generateRandom(), name: 'John', score: 11 },
        { id: generateRandom(), name: 'Paul', score: 110 },
        { id: generateRandom(), name: 'Clair', score: 99 },
        { id: generateRandom(), name: 'Engine', score: 9 },
        { id: generateRandom(), name: 'Pol', score: 91 },
        { id: generateRandom(), name: 'Merry', score: 17 },
        { id: generateRandom(), name: 'Ment', score: 71 }
      ],
      addElement: false
    };

    sortList(this.state.users);
  }

  generateList = () => {
    return this.state.users.map((item) => {
      return (
        <ListElement
          key={ item.id }
          data={ item }
          globalConst={ globalConst }
          handleListElementUpdate={ this.handleListElementUpdate }
        />
      );
    });
  }

  manageVisabilityOfNewListElement = () => {
    if (this.state.addElement) {
      return (
        <NewListElement
          handleConfirmAddElement={ this.handleConfirmAddElement }
          handleCancelAddNewElement={ this.handleCancelAddNewElement }
        />
      );
    }
  }

  manageVisabilityOfAddListElementBtn = () => {
    if (!this.state.addElement) {
      return (
        <button
          className="app-btn-add"
          onClick={ this.handleAddElement }>
          Add player
        </button>
      );
    }
  }

  handleConfirmAddElement = (item) => {
    this.setState(currentState => ({
      users: sortList([...currentState.users, item])
    }));
  }

  handleAddElement = () => {
    this.setState({ addElement: true });
  }

  handleCancelAddNewElement = () => {
    this.setState({ addElement: false });
  }

  handleListElementUpdate = (e, elementId, type) => {
    const { users } = this.state;
    const userIndex = users.findIndex(item => item.id === elementId);

    if (userIndex === -1) return false;
    switch (type) {
      case globalConst.UPDATE_PLAYER_NAME:
        users[userIndex].name = e.target.value;
        break;

      case globalConst.UPDATE_PLAYER_SCORES:
        users[userIndex].score = e.target.value;
        users[userIndex].showConfirm = true;
        break;

      case globalConst.CONFIRM_PLAYER_SCORES_UPDATE:
        users[userIndex].showConfirm = false;
        sortList(users);
        break;

      case globalConst.DELETE_PLAYER_FROM_LIST:
        users.splice(userIndex, 1);
        break;

      default:
        //
        break;
    }

    this.setState({ users });
  }

  render() {
    return (
      <div className="container">
        <div className="app-new-container">
          { this.manageVisabilityOfNewListElement() }
          { this.manageVisabilityOfAddListElementBtn() }
        </div>

        <ul className="app-list">{ this.generateList() }</ul>
      </div>
    );
  }
}

export default App;
